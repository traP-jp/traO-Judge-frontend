import { createRouter, createWebHistory } from 'vue-router'
import TopView from '@/views/TopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TopView
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/signup/SignupHomeView.vue')
        },
        {
          path: 'register',
          component: () => import('@/views/signup/SignupRegisterView.vue')
        },
        {
          path: 'after-mail',
          component: () => import('@/views/signup/SignupAfterMailView.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/reset-password',
      component: () => import('@/views/ResetPasswordView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/reset-password/ResetPasswordHomeView.vue')
        },
        {
          path: 'form',
          component: () => import('@/views/reset-password/ResetPasswordFormView.vue')
        },
        {
          path: 'after-mail',
          component: () => import('@/views/reset-password/ResetPasswordAfterMailView.vue')
        }
      ]
    },
    {
      path: '/users/:id',
      component: () => import('@/views/UserView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/user/UserHomeView.vue')
        },
        {
          path: 'submissions',
          component: () => import('@/views/user/UserSubmissionsView.vue')
        },
        { path: 'problems', component: () => import('@/views/user/UserProblemsView.vue') }
      ]
    },
    {
      path: '/problems',
      component: () => import('@/views/ProblemsView.vue')
    },
    {
      path: '/problems/:id',
      component: () => import('@/views/ProblemView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/problem/ProblemHomeView.vue')
        },
        {
          path: 'submit',
          component: () => import('@/views/problem/ProblemSubmitView.vue')
        },
        {
          path: 'submissions',
          component: () => import('@/views/problem/ProblemSubmissionsView.vue')
        },
        {
          path: 'submissions/:submissionId',
          component: () => import('@/views/problem/ProblemSubmissionView.vue')
        },
        {
          path: 'editorial',
          component: () => import('@/views/problem/ProblemEditorialView.vue')
        },
        {
          path: 'edit',
          component: () => import('@/views/problem/ProblemEditView.vue')
        }
      ]
    },
    {
      path: '/settings',
      component: () => import('@/views/SettingsView.vue'),
      children: [
        { path: '', redirect: '/settings/account' },
        {
          path: 'account',
          component: () => import('@/views/settings/SettingsAccountView.vue')
        },
        {
          path: 'profile',
          component: () => import('@/views/settings/SettingsProfileView.vue')
        }
      ]
    }
  ]
})

export default router
