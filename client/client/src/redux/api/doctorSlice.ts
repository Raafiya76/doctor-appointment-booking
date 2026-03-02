import { apiSlice } from "./apiSlice";

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    doctorSignup: builder.mutation({
      query: (data) => {
        return {
          url: "doctors/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllDoctors: builder.query({
      query: () => ({
        url: "doctors",
        method: "GET",
      }),
      providesTags: ["Doctors"],
    }),
    changeDoctorStatus: builder.mutation({
      query: (data) => {
        return {
          url: "users/change-doctor-status",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Doctors"],
    }),
    updateDoctor: builder.mutation({
      query: (data) => {
        return {
          url: `doctors/${data.userId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Doctors"],
    }),
    getDoctor: builder.query({
      query: (data) => ({
        url: `doctors/${data.userId}`,
        method: "GET",
      }),
      providesTags: ["Doctors"],
    }),
    getApprovedDoctors: builder.query({
      query: () => {
        const url = "doctors/approved-doctors";
        console.log("🔵 Calling getApprovedDoctors with URL:", url);
        return {
          url: url,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        console.log("🟢 Full Approved Doctors Response:", response);
        console.log("🟢 Doctors Array from response.data:", response?.data);
        console.log("🟢 Doctors Array length:", response?.data?.length);
        const transformedData = {
          data: response?.data || [],
        };
        console.log("🟢 Transformed data being returned:", transformedData);
        return transformedData;
      },
      transformErrorResponse: (response: any) => {
        console.error("🔴 Approved Doctors Error Response:", response);
        return response;
      },
      providesTags: ["Doctors"],
    }),
    checkBookingAvailability: builder.mutation({
      query: (data) => {
        return {
          url: "doctors/check-booking-availability",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Doctors"],
    }),
    doctorAppointments: builder.query({
      query: (data) => ({
        url: `doctors/appointments/${data.userId}`,
        method: "GET",
      }),
      providesTags: ["Doctors"],
    }),
    appointmentStatus: builder.mutation({
      query: (data) => {
        return {
          url: "doctors/change-appointment-status",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Doctors"],
    }),
    bookedAppointments: builder.query({
      query: (data) => ({
        url: `doctors/booked-appointments/${data.userId}`,
        method: "GET",
      }),
      providesTags: ["Doctors"],
    }),
  }),
});

export const {
  useDoctorSignupMutation,
  useGetAllDoctorsQuery,
  useChangeDoctorStatusMutation,
  useUpdateDoctorMutation,
  useGetDoctorQuery,
  useGetApprovedDoctorsQuery,
  useCheckBookingAvailabilityMutation,
  useDoctorAppointmentsQuery,
  useAppointmentStatusMutation,
  useBookedAppointmentsQuery,
} = doctorApiSlice;
