import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

const initialForm = {
  loginId: "",
  password: "",
};

function validateForm(form) {
  const errors = {};

  if (!form.loginId.trim()) {
    errors.loginId = "아이디를 입력해 주세요.";
  }

  if (!form.password.trim()) {
    errors.password = "비밀번호를 입력해 주세요.";
  }

  return errors;
}

function AdminLogin() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      // TODO:
      // 백엔드 로그인 API 연결
      // 예:
      // const response = await authApi.login(form);
      // localStorage.setItem("accessToken", response.data.accessToken);

      console.log("로그인 요청", form);
      alert("로그인 API 연결 전입니다.");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-login-section">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <p className="admin-login-label">Admin</p>
          <h1 className="admin-login-title">관리자 로그인</h1>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-login-group">
              <label htmlFor="loginId">아이디</label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                value={form.loginId}
                onChange={handleChange}
                placeholder="관리자 아이디"
              />
              {errors.loginId && (
                <p className="admin-login-error">{errors.loginId}</p>
              )}
            </div>

            <div className="admin-login-group">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
              />
              {errors.password && (
                <p className="admin-login-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/" className="admin-login-home-link">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;