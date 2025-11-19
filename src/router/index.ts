import TopView from '@/views/TopView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TopView
    },
    {
      path: '/signup',
      children: [
        {
          path: '',
          component: () => import('@/views/SignupView.vue')
        },
        {
          path: 'register',
          component: () => import('@/views/SignupRegisterView.vue')
        },
        {
          path: 'mail-send',
          component: () => import('@/views/SignupMailSendView.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/reset-password',
      children: [
        {
          path: '',
          component: () => import('@/views/ResetPasswordView.vue')
        },
        {
          path: 'form',
          component: () => import('@/views/ResetPasswordFormView.vue')
        },
        {
          path: 'mail-send',
          component: () => import('@/views/ResetPasswordMailSendView.vue')
        },
        {
          path: 'success',
          component: () => import('@/views/ResetPasswordSuccessView.vue')
        }
      ]
    },
    {
      path: `/oauth/callback`,
      component: () => import('@/views/OAuthCallbackView.vue')
    },
    {
      path: '/oauth/:provider/:action/callback',
      component: () => import('@/views/OAuthCallbackView.vue')
    },
    {
      path: '/users/:id',
      component: () => import('@/views/UserView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/user/UserHome.vue')
        },
        {
          path: 'submissions',
          component: () => import('@/views/user/UserSubmissions.vue')
        },
        { path: 'problems', component: () => import('@/views/user/UserProblems.vue') }
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
          component: () => import('@/views/problem/ProblemHome.vue')
        },
        {
          path: 'submit',
          component: () => import('@/views/problem/ProblemSubmit.vue')
        },
        {
          path: 'submissions',
          component: () => import('@/views/problem/ProblemSubmissions.vue')
        },
        {
          path: 'submissions/:submissionId',
          component: () => import('@/views/problem/ProblemSubmission.vue')
        },
        {
          path: 'editorials',
          component: () => import('@/views/problem/ProblemEditorials.vue')
        },
        {
          path: 'editorials/:editorialId',
          component: () => import('@/views/problem/ProblemEditorial.vue')
        }
      ]
    },
    {
      path: '/problems/:id/edit',
      component: () => import('@/views/ProblemEditView.vue'),
      children: [
        {
          path: '',
          redirect: (to) => {
            return `/problems/${to.params.id}/edit/basic`
          }
        },
        {
          path: 'basic',
          component: () => import('@/views/problem/edit/ProblemEditBasic.vue')
        },
        {
          path: 'statement',
          component: () => import('@/views/problem/edit/ProblemEditStatement.vue')
        },
        {
          path: 'testcases',
          component: () => import('@/views/problem/edit/ProblemEditTestcases.vue')
        },
        {
          path: 'editorials',
          component: () => import('@/views/problem/edit/ProblemEditEditorials.vue')
        },
        {
          path: 'editorials/:editorialId',
          component: () => import('@/views/problem/edit/ProblemEditEditorial.vue')
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
          component: () => import('@/views/settings/SettingsAccount.vue')
        },
        {
          path: 'profile',
          component: () => import('@/views/settings/SettingsProfile.vue')
        }
      ]
    }
  ]
})

export default router
