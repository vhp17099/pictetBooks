import { Routes } from '@angular/router';
import { BookDetail } from './components/book-detail/book-detail';
import { BookList } from './components/book-list/book-list';

export const routes: Routes = [
    {
        path: '',
        component: BookList,
        title: 'Book List',
    },
    {
        path: 'adventure/:id',
        component: BookDetail,
        title: 'Adventure Start',
    }
];
