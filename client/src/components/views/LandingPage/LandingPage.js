import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10vh" }}>
        <h2>시작 페이지 </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10vh" }}>
        <a href="/register">회원가입 페이지</a>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10vh" }}>
        <a href="/login">로그인 페이지</a>
      </div>
    </div>

    //
  );
}

export default LandingPage;
