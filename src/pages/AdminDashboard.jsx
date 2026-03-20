import { useMemo, useState } from "react";
import "./AdminDashboard.css";
import initialReservations from "../mock/reservations";

function AdminDashboard() {
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const requestedReservations = useMemo(() => {
    return reservations.filter((item) => item.status === "REQUESTED");
  }, [reservations]);

  const approvedReservations = useMemo(() => {
    return reservations.filter((item) => item.status === "APPROVED");
  }, [reservations]);

  const handleApprove = (id) => {
    setReservations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "APPROVED" } : item
      )
    );

    if (selectedReservation && selectedReservation.id === id) {
      setSelectedReservation((prev) =>
        prev ? { ...prev, status: "APPROVED" } : null
      );
    }
  };

  const handleCancelApprove = (id) => {
    setReservations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "REQUESTED" } : item
      )
    );

    if (selectedReservation && selectedReservation.id === id) {
      setSelectedReservation((prev) =>
        prev ? { ...prev, status: "REQUESTED" } : null
      );
    }
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <p className="admin-dashboard-label">Admin</p>
            <h1 className="admin-dashboard-title">예약 관리</h1>
            <p className="admin-dashboard-description">
              예약 요청 목록과 승인 완료 목록을 한 화면에서 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="admin-summary-grid">
          <div className="admin-summary-card">
            <span className="summary-card-label">예약 요청</span>
            <strong className="summary-card-value">
              {requestedReservations.length}
            </strong>
          </div>
          <div className="admin-summary-card">
            <span className="summary-card-label">예약 승인</span>
            <strong className="summary-card-value">
              {approvedReservations.length}
            </strong>
          </div>
        </div>

        <div className="admin-section-block">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              예약 요청 <span className="status-emoji">🟡</span>
            </h2>
            <span className="admin-section-count">
              {requestedReservations.length}건
            </span>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>행사명</th>
                  <th>대표자명</th>
                  <th>신청일시</th>
                </tr>
              </thead>
              <tbody>
                {requestedReservations.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-row">
                      예약 요청이 없습니다.
                    </td>
                  </tr>
                ) : (
                  requestedReservations.map((item) => (
                    <tr key={item.id}>
                      <td className="event-name-cell">
                        <button
                          type="button"
                          className="event-name-button"
                          onClick={() => handleOpenModal(item)}
                        >
                          {item.eventName}
                        </button>
                      </td>
                      <td>{item.representativeName}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section-block">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              예약 승인 <span className="status-emoji">🟢</span>
            </h2>
            <span className="admin-section-count">
              {approvedReservations.length}건
            </span>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>행사명</th>
                  <th>대표자명</th>
                  <th>신청일시</th>
                </tr>
              </thead>
              <tbody>
                {approvedReservations.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-row">
                      승인된 예약이 없습니다.
                    </td>
                  </tr>
                ) : (
                  approvedReservations.map((item) => (
                    <tr key={item.id}>
                      <td className="event-name-cell">
                        <button
                          type="button"
                          className="event-name-button"
                          onClick={() => handleOpenModal(item)}
                        >
                          {item.eventName}
                        </button>
                      </td>
                      <td>{item.representativeName}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedReservation && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">예약 상세 정보</h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                닫기
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-row">
                <span className="admin-detail-label">행사명</span>
                <span className="admin-detail-value">
                  {selectedReservation.eventName}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">대표자명</span>
                <span className="admin-detail-value">
                  {selectedReservation.representativeName}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">전화번호</span>
                <span className="admin-detail-value">
                  {selectedReservation.phone}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">리허설 시작시간</span>
                <span className="admin-detail-value">
                  {selectedReservation.rehearsalStartTime}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">공연 시작시간</span>
                <span className="admin-detail-value">
                  {selectedReservation.performanceStartTime}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">신청일시</span>
                <span className="admin-detail-value">
                  {selectedReservation.createdAt}
                </span>
              </div>

              <div className="admin-detail-row">
                <span className="admin-detail-label">상태</span>
                <span className="admin-detail-value">
                  {selectedReservation.status === "APPROVED"
                    ? "예약 승인"
                    : "예약 요청"}
                </span>
              </div>

              <div className="admin-modal-actions">
                {selectedReservation.status === "REQUESTED" ? (
                  <button
                    type="button"
                    className="approve-button"
                    onClick={() => handleApprove(selectedReservation.id)}
                  >
                    승인
                  </button>
                ) : (
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => handleCancelApprove(selectedReservation.id)}
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;