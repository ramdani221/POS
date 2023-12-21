import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxState} from "@/lib/redux/store";
import { fetchLoadDashboard } from "./dashboardAPI";

export interface DashboardState {
    totalsum: { totPurchase: number, totSelling: number, totSales: number, nonMember: number };
    report: ReportType[];
    footer: {
        page: number;
        limit: number;
        offset: number;
        pages: number;
        total: number;
    };
    status: 'idle' | 'loading' | 'failed'
}

const initialState: DashboardState = {
    totalsum: { totPurchase: 0, totSelling: 0, totSales: 0, nonMember: 0 },
    report: [{ monthly: '0', name: '', expense: '0', revenue: '0', earning: '0' }],
    footer: {
        page: 1,
        limit: 3,
        offset: 0,
        pages: 1,
        total: 1
    },
    status: 'idle'
}

export const loadDashboardAsync = createAsyncThunk(
    'Dashboard/loadDashboardAsync',
    async (params: ParamsDashboard) => {
        const { data } = await fetchLoadDashboard(params)
        return data
    }
)

export const loadReportAsync = createAsyncThunk(
    'Report/loadReportAsync',
    async (params: ParamsDashboard) => {
        const { data } = await fetchLoadDashboard(params)
        return data
    }
)

export const dashboardSlice = createSlice({
    name: 'Dashboards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadDashboardAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDashboardAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.totalsum = {
                    totPurchase: action.payload.totPurchase,
                    totSelling: action.payload.totSelling,
                    totSales: action.payload.totSales,
                    nonMember: action.payload.nonMember
                }
                state.report = action.payload.report;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadDashboardAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(loadReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.report = action.payload.report;
                state.footer = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(loadReportAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const selectTotSum = (state: ReduxState) => state.dashboard.totalsum;
export const selectReport = (state: ReduxState) => state.dashboard.report;
export const reportPagination = (state: ReduxState) => state.dashboard.footer;


export default dashboardSlice.reducer