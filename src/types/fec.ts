export interface CommitteeDetails {
  committee_id: string;
  name: string;
  committee_type: string;
  committee_type_full: string;
  filing_frequency: string;
  organization_type: string;
  organization_type_full: string;
  state: string;
  treasurer_name: string;
  last_updated: string;
}

export interface CommitteeFinancials {
  coverage_start_date: string;
  coverage_end_date: string;
  total_receipts: number;
  total_disbursements: number;
  cash_on_hand_end_period: number;
  affiliated_transfers: number;
  individual_contributions: number;
}

export interface IndependentExpenditure {
  candidate_name: string;
  support_oppose: string;
  total_amount: number;
  state: string;
  office: string;
}

export interface Donor {
  contributor_name: string;
  total_amount: number;
  employer: string;
  occupation: string;
}

export interface CombinedCommitteeData extends CommitteeDetails, CommitteeFinancials {
  displayName: string;
}