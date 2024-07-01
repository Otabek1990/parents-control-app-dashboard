/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Statistics = {
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

