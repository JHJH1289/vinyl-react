import { useState } from "react";
import "./ReservationForm.css";

const initialForm = {
  eventName: "",
  representativeName: "",
  phone: "",
  rehearsalStartTime: "",
  performanceStartTime: "",
};

function formatPhoneNumber(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length < 4) return numbers;
  if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

function validateForm(form) {
  const errors = {};

  if (!form.eventName.trim()) errors.eventName = "행사명을 입력해 주세요.";
  if (!form.representativeName.trim()) {
    errors.representativeName = "대표자명을 입력해 주세요.";
  }
  if (!form.phone.trim()) errors.phone = "전화번호를 입력해 주세요.";
  if (!form.rehearsalStartTime) {
    errors.rehearsalStartTime = "리허설 시작시간을 선택해 주세요.";
  }
  if (!form.performanceStartTime) {
    errors.performanceStartTime = "공연 시작시간을 선택해 주세요.";
  }

  if (
    form.rehearsalStartTime &&
    form.performanceStartTime &&
    form.rehearsalStartTime > form.performanceStartTime
  ) {
    errors.rehearsalStartTime =
      "리허설 시작시간은 공연 시작시간보다 늦을 수 없습니다.";
  }

  return errors;
}

export default function ReservationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
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

  const handlePhoneChange = (event) => {
    const formatted = formatPhoneNumber(event.target.value);

    setForm((prev) => ({
      ...prev,
      phone: formatted,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitted(false);

      console.log("예약 요청 데이터", form);

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error("예약 신청 실패", error);
      alert("예약 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="reservation-section">
      <div className="reservation-container">
        <p className="reservation-label">Reservation</p>
        <h1 className="reservation-title">대관 예약 신청</h1>
        <p className="reservation-description">
          최소 정보만 입력하는 간단 예약 폼입니다. 제출 후 관리자 확인을 거쳐
          일정이 정리됩니다.
        </p>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="reservation-grid">
            <div className="form-group full">
              <label htmlFor="eventName">행사명 </label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                value={form.eventName}
                onChange={handleChange}
                placeholder="ex : 00 동아리 정기 공연"
              />
              {errors.eventName && (
                <p className="error-text">{errors.eventName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="representativeName">대표자명 </label>
              <input
                id="representativeName"
                name="representativeName"
                type="text"
                value={form.representativeName}
                onChange={handleChange}
                placeholder="홍길동"
              />
              {errors.representativeName && (
                <p className="error-text">{errors.representativeName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호 </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handlePhoneChange}
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="rehearsalStartTime">리허설 시작시간 </label>
              <input
                id="rehearsalStartTime"
                name="rehearsalStartTime"
                type="time"
                value={form.rehearsalStartTime}
                onChange={handleChange}
              />
              {errors.rehearsalStartTime && (
                <p className="error-text">{errors.rehearsalStartTime}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="performanceStartTime">공연 시작시간 </label>
              <input
                id="performanceStartTime"
                name="performanceStartTime"
                type="time"
                value={form.performanceStartTime}
                onChange={handleChange}
              />
              {errors.performanceStartTime && (
                <p className="error-text">{errors.performanceStartTime}</p>
              )}
            </div>
          </div>

          <div className="reservation-actions">
            <div>
              {submitted && (
                <p className="success-text">예약 신청이 접수되었습니다.</p>
              )}
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "예약 신청하기"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}