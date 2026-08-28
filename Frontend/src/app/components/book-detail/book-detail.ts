import { ChangeDetectorRef, Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../service/bookService/book-service';
import { Book } from '../../types/book';
import { Section } from '../../types/section';
import { Option } from '../../types/option';
import { Consequence } from '../../types/consequence';
import { ConsequenceType } from '../../types/consequence-type';
import { SectionType } from '../../types/section-type';

interface ConsequenceFeedback {
  text: string;
  type: ConsequenceType;
  valueChange?: number;
}

@Component({
  imports: [RouterLink],
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
})
export class BookDetail {
  readonly ConsequenceType = ConsequenceType;
  readonly SectionType = SectionType;

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);


  bookId: number = -1;
  book: Book | null = null;
  currentSection: Section | null = null;

  isLoading = true;
  errorMessage: string | null = null;

  // Player State
  readonly maxHealth = 10;
  health = 10;
  consequenceFeedback: ConsequenceFeedback | null = null;
  isGameOver = false;
  isVictory = false;
  visitedSections: number[] = [];

  constructor() {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.loadBook();
  }

  private async loadBook() {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const result = await this.bookService.getBook(this.bookId);
      if (!result || !result.sections || result.sections.length === 0) {
        throw new Error('This adventure book contains no chapters or could not be loaded.');
      }
      this.book = result;
      this.startAdventure();
    } catch (err: any) {
      console.error('Error loading book:', err);
      this.errorMessage = err?.message || 'Failed to load the adventure.';
    } finally {
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  startAdventure() {
    this.health = this.maxHealth;
    this.consequenceFeedback = null;
    this.isGameOver = false;
    this.isVictory = false;
    this.visitedSections = [];

    if (this.book?.sections?.length) {
      const beginSection = this.book.sections.find(s => s.type === SectionType.BEGIN || s.id === 1) ?? this.book.sections[0];
      this.currentSection = beginSection;
      this.visitedSections.push(beginSection.id);
      this.checkEndState(beginSection);
    }
    this.changeDetectorRef.markForCheck();
  }

  chooseOption(option: Option) {
    debugger;
    if (this.isGameOver || this.isVictory) return;

    // 1. Process Consequence
    const consequences = this.getOptionConsequences(option);
    this.consequenceFeedback = null;

    for (const consequence of consequences) {
      const val = typeof consequence.value === 'string' ? parseInt(consequence.value, 10) || 0 : (consequence.value || 0);
      const typeStr = (consequence.type || '').toUpperCase();

      if (typeStr === ConsequenceType.LOSE_HEALTH) {
        const dmg = Math.abs(val) || 1; // Error proofing
        this.health = Math.max(0, this.health - dmg); // Don't go below 0 health
        this.consequenceFeedback = {
          text: consequence.text || `You took ${dmg} damage!`,
          type: ConsequenceType.LOSE_HEALTH,
          valueChange: -dmg
        };
      } else if (typeStr === ConsequenceType.GAIN_HEALTH) {
        const heal = Math.abs(val) || 1;
        this.health = Math.min(this.maxHealth, this.health + heal); // Assume maximum maxHealth
        this.consequenceFeedback = {
          text: consequence.text || `You recovered ${heal} health!`,
          type: ConsequenceType.GAIN_HEALTH,
          valueChange: heal
        };
      } else {
        this.consequenceFeedback = {
          text: consequence.text,
          type: ConsequenceType.OTHER
        };
      }
    }

    // 2. Check Death / Game Over
    if (this.health <= 0) {
      this.isGameOver = true;
      this.changeDetectorRef.markForCheck();
      return;
    }

    // 3. Navigate to gotoId section
    const nextSection = this.book?.sections?.find(s => s.id === option.gotoId);
    if (nextSection) {
      this.currentSection = nextSection;
      this.visitedSections.push(nextSection.id);
      this.checkEndState(nextSection);
    } else {
      console.warn(`Section with gotoId ${option.gotoId} not found in book`);
    }

    // Scroll smoothly to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.changeDetectorRef.markForCheck();
  }

  private checkEndState(section: Section) {
    if (section.type === SectionType.END || !section.options || section.options.length === 0) {
      this.isVictory = true;
    }
  }

  getOptionConsequences(option: Option): Consequence[] {
    if (option.consequence && option.consequence.length > 0) {
      return option.consequence;
    }
    return [];
  }

  getSectionTitle(section: Section | null): string {
    if (!section) return 'Adventure';
    if (section.title) return section.title;

    if (section.type === SectionType.BEGIN) {
      return 'The Adventure Begins';
    }
    if (section.type === SectionType.END) {
      return 'The Final Chapter';
    }
    return `Chapter ${this.visitedSections.indexOf(section.id) + 1 || section.id}`;
  }

  get healthPercentage(): number {
    return Math.round((this.health / this.maxHealth) * 100);
  }

  get healthColorClass(): string {
    if (this.health > 12) return 'bg-emerald-500 text-emerald-700';
    if (this.health > 6) return 'bg-amber-500 text-amber-700';
    return 'bg-rose-500 text-rose-700';
  }
}

