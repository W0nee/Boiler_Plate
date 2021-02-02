import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, submitReceiver } from "../../../_actions/user_action";

var CheckAuthNum = 0;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Year, setYear] = useState("");
  const [Month, setMonth] = useState("");
  const [Day, setDay] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Receiver, setReceiver] = useState("");
  const [AuthNum, setAuthNum] = useState("");
  // const [CheckAuthNum, setCheckAuthNum] = useState(false);
  // var CheckAuthNum = 0; 왜 여기에 변수 설정하면 안됨?? 전역변수 처리

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onYearHandler = (event) => {
    setYear(event.currentTarget.value);
  };

  const onMonthHandler = (event) => {
    setMonth(event.currentTarget.value);
  };

  const onDayHandler = (event) => {
    setDay(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onReceiverHandler = (event) => {
    setReceiver(event.currentTarget.value);
  };

  const onAuthNumHandler = (event) => {
    setAuthNum(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 페이지 리로드 방지
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }

    let body = {
      email: Email,
      name: Name,
      year: Year,
      month: Month,
      day: Day,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        props.history.push("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  const onSubmitReceiverHandler = (event) => {
    event.preventDefault();

    let body = {
      receiver: Receiver,
    };

    dispatch(submitReceiver(body)).then((response) => {
      if (response.payload.receiverSuccess) {
        CheckAuthNum = response.payload.checkAuthNum;
      } else {
        // alert("인증번호 전송에 실패했습니다.");
        // async-await 개념
      }
    });
  };

  const onCheckAuthNumHandler = (event) => {
    event.preventDefault();

    console.log(AuthNum);
    console.log(CheckAuthNum);

    if (AuthNum !== CheckAuthNum.toString()) {
      alert("인증번호가 틀렸습니다.");
    } else {
      alert("인증번호 확인이 완료되었습니다.");
    }
  };

  const appendYear = () => {
    var year = new Date().getFullYear();
    var arr = [];

    for (var i = year - 110; i <= year; i++) {
      arr.push(<option value={i}>{i + " 년"}</option>);
    }

    return arr;
  };

  const appendMonth = () => {
    var arr = [];

    for (var i = 1; i <= 12; i++) {
      arr.push(<option value={i}>{i + " 월"}</option>);
    }

    return arr;
  };

  const appendDay = () => {
    var arr = [];

    for (var i = 1; i <= 31; i++) {
      arr.push(<option value={i}>{i + " 일"}</option>);
    }

    return arr;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>비밀번호 확인</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <label>이름</label>
        <input type="value" value={Name} onChange={onNameHandler} />
        <label>생년월일</label>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <select id="year" onChange={onYearHandler}>
            <option value="0">년</option>
            {appendYear()};
          </select>
          <select id="month" onChange={onMonthHandler}>
            <option value="0">월</option>
            {appendMonth()};
          </select>
          <select id="day" onChange={onDayHandler}>
            <option value="0">일</option>
            {appendDay()};
          </select>
        </div>
        <label style={{ display: "flex", flexDirection: "column" }}>휴대전화</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="value" name={Receiver} onChange={onReceiverHandler} />
          &nbsp;&nbsp;&nbsp;
          <button type="submit" onClick={onSubmitReceiverHandler}>
            인증
          </button>
        </div>
        <label>인증번호</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="value" name={AuthNum} onChange={onAuthNumHandler} />
          &nbsp;&nbsp;&nbsp;
          <button type="submit" onClick={onCheckAuthNumHandler}>
            확인
          </button>
        </div>
        <br></br>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
