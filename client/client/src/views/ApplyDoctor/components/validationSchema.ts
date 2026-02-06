import * as Yup from "yup";

export const applyDoctorSchema = Yup.object().shape({
  prefix: Yup.string().required("Prefix is required"),
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  //   website is not required
  website: Yup.string().nullable(),
  address: Yup.string().required("Address is required"),
  specialization: Yup.string().required("Specialization is required"),
  experience: Yup.string().required("Experience is required"),
  feePerConsultation: Yup.string().required("Fee Per Consultation is required"),
  fromTime: Yup.string().required("From Time is required"),
  toTime: Yup.string().required("To Time is required"),
});
