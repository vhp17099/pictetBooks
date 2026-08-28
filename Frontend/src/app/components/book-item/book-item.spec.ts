import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookItem } from './book-item';

describe('Book', () => {
  let component: BookItem;
  let fixture: ComponentFixture<BookItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BookItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
