export declare function getDateFromSelectors(prefix: any): Date;
export declare function gestationalAgeFromLMP(lmpDate: any, currentDate: any): {
    weeks: number;
    days: number;
};
export declare function gestationalAgeFromUsg(usgDate: any, usgAgeWeeks: any, usgAgeDays: any, currentDate: any): {
    weeks: number;
    days: number;
};
export declare function calculateDueDateByLMP(lmpDate: any): Date;
export declare function calculateDueDateByUsg(usgDate: any, usgAgeWeeks: any, usgAgeDays: any): Date;
export declare function formatDate(date: any): string;
export declare function validateUsgInput(usgAgeWeeks: any, usgAgeDays: any): {
    valid: boolean;
    error: string;
} | {
    valid: boolean;
    error?: never;
};
//# sourceMappingURL=gestationalUtils.d.ts.map