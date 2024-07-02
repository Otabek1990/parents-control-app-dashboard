/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StatisticsAdmin = {
  daily_stats: {
    parent_growth_percentage: number;
    partner_growth_percentage: number;
    child_growth_percentage: number;
    daily_joined_parents: number;

  };
  overall_stats: {
    all_boys: number;
    all_children: number;
    all_girls: number;
    all_monthly_clients:number;
    all_yearly_clients:number;
    all_paid_parents: number;
    all_unpaid_parents: number;
    total_parents: number;
    bar_graph_data_with_profit: {
      parents: number;
      boys: number;
      girls: number;
      total_partner_profit: number;
    };
    get_client_adding_plan:{
      added_clients:number;
      days_progress:number;
      remaining_clients:number;
      remaining_days:number;
    };
    circle_graph_data: number;
    total_amount_paid_to_partners: number;
    total_net_profit: number;
    total_profit: number;
  };
  
};

export type StatisticsPartner = {
  daily_statistics: {
    parent_growth: number;
    child_growth: number;
    daily_joined_parents: number;
  };
  overall_statistics: {
    total_parents_paid: number;
    total_parents_unpaid: number;
    total_boys: number;
    total_girls: number;
    total_parents: number;
    total_children: number;
    bar_graph_data_with_profit: {
      parents: number;
      boys: number;
      girls: number;
      total_partner_profit: number;
    };
    circle_graph_data: number;
    total_payme: number;
    total_paynet: number;
    total_profit: number;
  };
};

