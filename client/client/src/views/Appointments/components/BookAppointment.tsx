// React Imports
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Redux
import {
  useBookedAppointmentsQuery,
  useCheckBookingAvailabilityMutation,
  useGetDoctorQuery,
} from "../../../redux/api/doctorSlice";
// Utils
import {
  add30Minutes,
  convertToAMPMFormat,
  formatDate,
  formatTime,
  onKeyDown,
  thousandSeparatorNumber,
} from "../../../utils";
// React Icons
import { RiLuggageDepositLine } from "react-icons/ri";
import { MdOutlineExplicit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
// Formik
import { Form, Formik, FormikProps } from "formik";
// Yup
import * as Yup from "yup";
// MUI Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Grid, Divider, Button, TextField } from "@mui/material";
// Custom Imports
import DatePicker from "../../../components/DatePicker";
import Navbar from "../../../components/Navbar";
import { Heading, SubHeading } from "../../../components/Heading";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId, userIsDoctor } from "../../../redux/auth/authSlice";
import {
  useBookAppointmentMutation,
  useGetUserQuery,
} from "../../../redux/api/userSlice";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";

const AppointmentSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
});

interface AppointmentForm {
  date: string | null;
  time: string | null;
}

const BookAppointment = () => {
  const navigate = useNavigate();
  // Doctor Id  ===> userId
  const { userId } = useParams();
  const loginUserId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);
  const [isAvailable, setIsAvailable] = useState(false);
  const [appointment, setAppointment] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<AppointmentForm>({
    date: null,
    time: null,
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // Doctor Get API
  const { data, isLoading } = useGetDoctorQuery({
    userId,
  });

  // User Get API
  const { data: logedInUserData, isLoading: logedInUserLoading } =
    useGetUserQuery({
      userId: loginUserId,
    });

  // Get Booked Slots API
  const { data: getAppointmentData, isLoading: getAppointmentLoading } =
    useBookedAppointmentsQuery({ userId });

  const [bookAppointment, { isLoading: appointmentLoading }] =
    useBookAppointmentMutation();

  const [checkBookingAvailability, { isLoading: checkBookingLoading }] =
    useCheckBookingAvailabilityMutation();

  const appointmentHandler = async (appointmentData: AppointmentForm) => {
    if (appointment === "checkAvailability") {
      const payload = {
        doctorId: userId,
        date: appointmentData.date,
        time: appointmentData.time,
      };
      const doctorAvailability: any = await checkBookingAvailability(payload);

      if (doctorAvailability?.data?.status) {
        setIsAvailable(true);
        setToast({
          ...toast,
          message: doctorAvailability?.data?.message,
          appearence: true,
          type: "success",
        });
      }
      if (doctorAvailability?.error) {
        setToast({
          ...toast,
          message: doctorAvailability?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }

      try {
      } catch (error) {
        console.error("Check Booking Availability Error:", error);
        setToast({
          ...toast,
          message: "Something went wrong",
          appearence: true,
          type: "error",
        });
      }
    }

    if (appointment === "bookAppointment") {
      const payload = {
        doctorId: userId,
        userId: loginUserId,
        doctorInfo: data?.data,
        userInfo: logedInUserData?.data,
        date: appointmentData.date,
        time: appointmentData.time,
      };

      try {
        const userAppointment: any = await bookAppointment(payload);
        if (userAppointment?.data?.status) {
          setIsAvailable(false);
          setToast({
            ...toast,
            message: userAppointment?.data?.message,
            appearence: true,
            type: "success",
          });
          setTimeout(() => {
            navigate(isDoctor ? "/doctors/appointments" : "/appointments");
          }, 1500);
        }
        if (userAppointment?.error) {
          setToast({
            ...toast,
            message: userAppointment?.error?.data?.message,
            appearence: true,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Book Appointment Error:", error);
        setToast({
          ...toast,
          message: "Something went wrong",
          appearence: true,
          type: "error",
        });
      }
    }
  };

  return (
    <>
      {(isLoading || logedInUserLoading || getAppointmentLoading) && (
        <OverlayLoader />
      )}
      <Navbar>
        <Heading>Book Appointments</Heading>
        <Box>
          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid item xs={4}>
              <Box
                sx={{
                  margin: "20px 0",
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "15px 20px 5px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Heading
                    sx={{
                      margin: "5px 0",
                      fontSize: "18px",
                    }}
                  >
                    Timings
                  </Heading>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <IoMdTime />
                    <Box>{`${convertToAMPMFormat(
                      data?.data?.fromTime
                    )} to ${convertToAMPMFormat(data?.data?.toTime)}`}</Box>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ marginTop: "10px" }}>
                  <Formik
                    initialValues={formValues}
                    onSubmit={(values: AppointmentForm) => {
                      appointmentHandler(values);
                    }}
                    validationSchema={AppointmentSchema}
                    enableReinitialize
                  >
                    {(props: FormikProps<AppointmentForm>) => {
                      const { values, touched, errors, setFieldValue } = props;

                      return (
                        <Form onKeyDown={onKeyDown}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Select Date
                            </SubHeading>
                            <DatePicker
                              label=""
                              minDate={new Date()}
                              value={values.date}
                              handleChange={(value: any) => {
                                setFieldValue("date", value);
                                setIsAvailable(false);
                              }}
                            />
                            {errors.date && touched.date && (
                              <Box
                                sx={{
                                  color: "#d32f2f",
                                  marginLeft: "2px",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {errors.date}
                              </Box>
                            )}
                          </Box>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Select Time
                            </SubHeading>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label=""
                                value={values.time}
                                onChange={(value) => {
                                  setFieldValue("time", value);
                                  setIsAvailable(false);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    sx={{ width: "100%" }}
                                    {...params}
                                  />
                                )}
                              />
                              {errors.time && touched.time && (
                                <Box
                                  sx={{
                                    color: "#d32f2f",
                                    marginLeft: "2px",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {errors.time}
                                </Box>
                              )}
                            </LocalizationProvider>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              type="submit"
                              variant="outlined"
                              color="success"
                              fullWidth
                              disabled={checkBookingLoading}
                              sx={{
                                padding: "5px 30px",
                                textTransform: "capitalize",
                                margin: "20px 0",
                              }}
                              onClick={() => {
                                setAppointment("checkAvailability");
                              }}
                            >
                              {checkBookingLoading
                                ? "Checking Availability..."
                                : "Check Availability"}
                            </Button>
                          </Box>

                          {isAvailable && (
                            <Button
                              type="submit"
                              variant="outlined"
                              fullWidth
                              disabled={appointmentLoading}
                              sx={{
                                padding: "5px 30px",
                                textTransform: "capitalize",
                                margin: "0px 0 20px 0",
                              }}
                              onClick={() => {
                                setAppointment("bookAppointment");
                              }}
                            >
                              {appointmentLoading
                                ? "Booking..."
                                : "Book Appointment"}
                            </Button>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  margin: "20px 0",
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "15px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                }}
              >
                <Heading
                  sx={{
                    margin: "5px 0",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {`${data?.data?.prefix} ${data?.data?.fullName}`}
                  <Box sx={{ fontSize: "14px" }}>
                    {`(${data?.data?.specialization})`}
                  </Box>
                </Heading>
                <Divider />
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <IoMdTime />
                    Consultation Time
                  </Box>
                  <Box>30 Minutes </Box>
                </Box>
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <RiLuggageDepositLine />
                    Department
                  </Box>
                  <Box>{data?.data?.specialization}</Box>
                </Box>
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <MdOutlineExplicit />
                    Experience
                  </Box>
                  <Box>{data?.data?.experience} Years </Box>
                </Box>

                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <CiMoneyCheck1 />
                    Fee Per Visit
                  </Box>
                  <Box>
                    {thousandSeparatorNumber(data?.data?.feePerConsultation)}
                  </Box>
                </Box>
                <Box
                  sx={{
                    margin: "15px 0 10px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "220px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <CiLocationOn />
                    Location
                  </Box>
                  <Box>{data?.data?.address}</Box>
                </Box>
              </Box>
            </Grid>
            {getAppointmentData?.data?.length > 0 && (
              <Grid item xs={4}>
                <Box
                  sx={{
                    margin: "20px 0",
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "15px 20px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                  }}
                >
                  <Heading
                    sx={{
                      margin: "5px 0",
                      fontSize: "18px",
                    }}
                  >
                    Booked Appointments Details
                  </Heading>
                  <Divider />
                  {getAppointmentData?.data?.map((item: any) => (
                    <Box
                      sx={{
                        margin: "15px 0 10px 0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: "150px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        {formatDate(item?.date)}
                      </Box>
                      <Box
                        sx={{
                          background: "#eaebef",
                          color: "#6c777f",
                          padding: "5px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "150px",
                          fontSize: "13px",
                        }}
                      >
                        {`${formatTime(item?.time)} to ${formatTime(
                          add30Minutes(item?.time)
                        )}`}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Navbar>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default BookAppointment;
