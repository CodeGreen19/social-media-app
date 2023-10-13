import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import Loading from "../loading/Loading";

function AlertMessage() {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message: updateMessage,
  } = useSelector((state) => state.updateUser);
  const {
    loading: forgetLoading,
    error: forgetError,
    message: forgetMessage,
  } = useSelector((state) => state.updatePassword);
  const {
    loading: postLoading,
    error: postError,
    message: postMessage,
  } = useSelector((state) => state.post);
  const { loading: showCommentLoading } = useSelector(
    (state) => state.comments
  );

  // these state for showing custom alerts
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  // custom alert function
  const handleAlert = (text) => {
    setAlertText(text);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  // this useEffect is used to show custom alerts
  useEffect(() => {
    // error showing
    if (error) {
      handleAlert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      handleAlert(message);
      dispatch({ type: "clearErrors" });
    }
    //  message showing
    if (updateError) {
      handleAlert(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (updateMessage) {
      handleAlert(updateMessage);
      dispatch({ type: "clearMessage" });
    }
    if (forgetError) {
      handleAlert(forgetError);
      dispatch({ type: "clearErrors" });
    }
    if (forgetMessage) {
      handleAlert(forgetMessage);
      dispatch({ type: "clearMessage" });
    }
    if (postError) {
      handleAlert(postError);
      dispatch({ type: "clearErrors" });
    }
    if (postMessage) {
      handleAlert(postMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [
    error,
    message,
    dispatch,
    updateMessage,
    updateError,
    forgetError,
    forgetMessage,
    postError,
    postMessage,
  ]);

  return (
    <Fragment>
      {loading ||
      updateLoading ||
      forgetLoading ||
      postLoading ||
      showCommentLoading ? (
        <Loading />
      ) : (
        ""
      )}
      {alert && <Alert text={alertText} />}
    </Fragment>
  );
}

export default AlertMessage;
