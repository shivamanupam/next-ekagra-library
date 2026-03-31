// lib/pricing.ts

export const PLAN_CONFIG = {
  WEEKLY: {
    amount: 200,
    durationDays: 7,
  },
  MONTHLY: {
    amount: 600,
    durationDays: 30,
  },
  QUARTERLY: {
    amount: 1500,
    durationDays: 90,
  },
  HALF_YEARLY: {
    amount: 2800,
    durationDays: 180,
  },
  YEARLY: {
    amount: 5000,
    durationDays: 365,
  },
} as const;

export type PlanType = keyof typeof PLAN_CONFIG;

export function getPlanAmount(plan: PlanType) {
  return PLAN_CONFIG[plan].amount;
}

export function getPlanDuration(plan: PlanType) {
  return PLAN_CONFIG[plan].durationDays;
}
