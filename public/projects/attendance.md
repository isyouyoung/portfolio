# 학과 스터디 출석 체크 봇

> 교내 빅데이터 학습동아리 운영 · 2025.09
> **목표**: 매주 운영자가 손으로 적던 출석을 자동화

## 문제

학과 스터디 운영진을 하면서 매주 출석을 손으로 구글 시트에 적어 옮겼는데,
누락이 잦고 시간도 30분씩 걸렸음.

## 해결

| 구성 요소 | 역할 |
| --- | --- |
| 카카오톡 봇 | "출석" 메시지 받으면 시간과 사용자 ID 저장 |
| Python 서버 | 메시지를 받아 구글 시트에 한 줄 추가 |
| React 관리 페이지 | 주별 출석률·결석자 한눈에 보기 |

## React 관리 페이지

운영진만 보는 작은 페이지라서 라우팅 없이 단일 페이지.
간단한 출석률 카드와 표만.

```javascript
function AttendanceTable({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>출석</th>
          <th>지각</th>
          <th>결석</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td>{r.name}</td>
            <td className="text-emerald-600">{r.present}</td>
            <td className="text-amber-600">{r.late}</td>
            <td className="text-red-600">{r.absent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 운영 결과

- 출석 기록 누락 0건 (이전 평균 주 2건)
- 운영자 작업 시간 30분 → 1분 미만
- 다른 학과 스터디에서도 봇 코드를 가져가 사용 중

## 다음

- 결석자에게 자동 리마인드 메시지 보내기
- 학기 말 출석률 리포트 PDF 생성
