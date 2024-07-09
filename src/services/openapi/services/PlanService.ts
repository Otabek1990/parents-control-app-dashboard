import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

import { PlanCreate } from '../models/PlanCreate';
import { PlanList } from '../models/PlanList';

const getRoleFromLocalStorage = (): string | null => {
  return localStorage.getItem('role');
};

const isAdmin = (): boolean => {
  const role = getRoleFromLocalStorage();
  return role === 'ADMIN';
};

export class PlanService {
  /**
   * Get list of plans. Requires 'admin' role.
   * @returns Array of PlanList
   * @throws Error if unauthorized or API error
   */
  public static planList(): CancelablePromise<Array<PlanList>> {
    if (isAdmin()) {
      return __request(OpenAPI, {
        method: 'GET',
        url: '/admin-panel-statistics/client-adding-plans/',
      });
    }
    else {
      return Promise.reject(new Error('Unauthorized access')) as CancelablePromise<Array<PlanList>>;
    }
  }

  /**
   * Create a new plan. Requires 'admin' role.
   * @param data PlanCreate object
   * @returns Created PlanCreate object
   * @throws Error if unauthorized or API error
   */
  public static planCreate(data: PlanCreate): CancelablePromise<PlanCreate> {
    if (isAdmin()) {
      return __request(OpenAPI, {
        method: 'POST',
        url: '/admin-panel-statistics/client-adding-plans/',
        body: data,
      });
    }
    else {
      return Promise.reject(new Error('Unauthorized access')) as CancelablePromise<PlanCreate>;
    }
  }
}
