import { Routes } from '@angular/router';
// ... tus imports de componentes ...
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { BookListComponent } from './pages/book-list/book-list';
import { ProfileComponent } from './pages/profile/profile';
import { BookDetailComponent } from './pages/book-detail/book-detail';
import { MyBooksComponent } from './pages/my-books/my-books';
import { AddBookComponent } from './pages/add-book/add-book';
import { ChatListComponent } from './pages/chat-list/chat-list';
import { ChatConversationComponent } from './pages/chat-conversation/chat-conversation';
import { EditBookComponent } from './pages/edit-book/edit-book';
import { EditProfileComponent } from './pages/edit-profile/edit-profile';
import { ReceivedProposalsComponent } from './pages/received-proposals/received-proposals';
import { HomeComponent } from './pages/home/home';
import { ExchangeHistoryComponent } from './pages/exchange-history/exchange-history';
import { ProposalDetailComponent } from './pages/proposal-detail/proposal-detail';
import { ChangePasswordComponent } from './pages/change-password/change-password';
import { MeetingPointsComponent } from './pages/meeting-points/meeting-points';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';
import { AboutUsComponent } from './pages/about-us/about-us';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { ProposalsSentComponent } from './pages/proposals-sent/proposals-sent';
import { AdminUserListComponent } from './pages/admin-user-list/admin-user-list';
import { AdminBookListComponent } from './pages/admin-book-list/admin-book-list';
import { PublicProfileComponent } from './pages/public-profile/public-profile';

// Guards
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { notAdminGuard } from './core/guards/not-admin.guard'; // 👈 IMPORTANTE: Importar el nuevo guard
import { AdminReportsComponent } from './pages/admin-reports/admin-reports';

export const routes: Routes = [
  // Rutas Públicas (Login/Registro/Home)
  { path: '', component: HomeComponent,canActivate: [notAdminGuard]}, 
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  
  // Páginas informativas (Pueden ser vistas por ambos, o bloquear si prefieres)
  { path: 'sobre-nosotros', component: AboutUsComponent },
  { path: 'terminos', component: AboutUsComponent },
  { path: 'privacidad', component: AboutUsComponent },

  // =========================================================
  // 🔒 RUTAS DE USUARIO NORMAL (Bloqueadas para Admin)
  // =========================================================
  
  { 
    path: 'catalogo', 
    component: BookListComponent,
    canActivate: [notAdminGuard] // 👈 Admin no entra aquí
  },
  { 
    path: 'perfil', 
    component: ProfileComponent, 
    canActivate: [authGuard, notAdminGuard] 
  },
  { 
    path: 'perfil/editar', 
    component: EditProfileComponent, 
    canActivate: [authGuard, notAdminGuard] 
  },
  { 
    path: 'perfil/cambiar-password', 
    component: ChangePasswordComponent, 
    canActivate: [authGuard, notAdminGuard] 
  },
  { 
    path: 'usuario/:id', 
    component: PublicProfileComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  { 
    path: 'puntos-encuentro', 
    component: MeetingPointsComponent,
    canActivate: [notAdminGuard] 
  },
  {
    path: 'historial', 
    component: ExchangeHistoryComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  {
    path: 'libros/nuevo',
    component: AddBookComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  { 
    path: 'libros/:id/editar', 
    component: EditBookComponent, 
    canActivate: [authGuard, notAdminGuard] 
  },
  { 
    // Detalle de libro (Vista de usuario). El admin ve libros en su panel.
    path: 'libros/:id',
    component: BookDetailComponent,
    canActivate: [notAdminGuard] 
  },
  {
    path: 'mis-libros',
    component: MyBooksComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  
  // --- Chat y Propuestas (Exclusivo Usuarios) ---
  {
    path: 'chat', 
    component: ChatListComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  {
    path: 'chat/:id', 
    component: ChatConversationComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  {
    path: 'propuestas/recibidas', 
    component: ReceivedProposalsComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  {
    path: 'propuestas/enviadas', 
    component: ProposalsSentComponent,
    canActivate: [authGuard, notAdminGuard]
  },
  { 
    path: 'propuestas/:id', 
    component: ProposalDetailComponent, 
    canActivate: [authGuard, notAdminGuard] 
  },

  // =========================================================
  // 🛡️ RUTAS DE ADMINISTRADOR (Bloqueadas para Usuarios)
  // =========================================================
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: AdminUserListComponent },
      { path: 'books', component: AdminBookListComponent },
      { path: 'reports', component: AdminReportsComponent } // 👈 NUEVA RUTA
    ]
  },
];