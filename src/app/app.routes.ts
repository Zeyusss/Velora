import { Routes } from '@angular/router';
import { AnonLayoutComponent } from './core/layout/anon-layout/anon-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { isloggedinGuard } from './core/guard/isloggedin/isloggedin-guard';
import { authGuard } from './core/guard/auth/auth-guard';
import { ForgotpasswordComponent } from './core/auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AnonLayoutComponent,
    canActivate: [isloggedinGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      { path: 'register', component: RegisterComponent, title: 'RegisterPage' },
      { path: 'forgotpassword', component: ForgotpasswordComponent, title: 'ForgotPassword Page' },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands Page',
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories Page',
      },
      {
        path: 'checkout/:cartId',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'checkout Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((c) => c.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'allorders Page',
      },
      {
        path: 'newsletter',
        loadComponent: () =>
          import('./features/newsletter/newsletter.component').then((c) => c.NewsletterComponent),
        title: 'NewsLetter Page',
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/faq/faq.component').then((c) => c.FaqComponent),
        title: 'FAQ Page',
      },
      {
        path: 'contactus',
        loadComponent: () =>
          import('./features/contactus/contactus.component').then((c) => c.ContactusComponent),
        title: 'ContactUs Page',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];
