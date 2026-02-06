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
      query: () => ({
        url: "doctors/approved-doctors",
        method: "GET",
      }),
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
