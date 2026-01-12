 export const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return null;
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainSeconds}s`;
  };

  function haversineDistance(p1, p2) {
  const R = 6371; // 지구 반지름 (단위: km)
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(p2[0] - p1[0]);
  const dLon = toRad(p2[1] - p1[1]);
  const lat1 = toRad(p1[0]);
  const lat2 = toRad(p2[0]);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // km 단위 거리
}
 export function makeOrderedRoute(points) {
  if (points.length <= 2) return points;


  // ✅ Haversine 기반 거리 계산
  let maxDist = 0;
  let endpoints = [null, null];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = haversineDistance(points[i], points[j]) **4;
      if (dist > maxDist) {
        maxDist = dist;
        endpoints = [points[i], points[j]];
      }
    }
  }

const [origin, destination] = endpoints;

// origin / destination 제외한 중간 포인트
let remaining = points.filter(
  (p) =>
    !(p[0] === origin[0] && p[1] === origin[1]) &&
    !(p[0] === destination[0] && p[1] === destination[1])
);

const ordered = [];
let current = origin;

while (remaining.length > 0) {
  // 현재 위치에서 가장 가까운 포인트 찾기
  let nearestIdx = 0;
  let nearestDist = haversineDistance(current, remaining[0]);

  for (let i = 1; i < remaining.length; i++) {
    const dist = haversineDistance(current, remaining[i]);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestIdx = i;
    }
  }

  const nearestPoint = remaining[nearestIdx];
  ordered.push(nearestPoint);

  // 선택한 포인트 제거
  remaining.splice(nearestIdx, 1);

  // 현재 위치 갱신
  current = nearestPoint;
}

return [origin, ...ordered, destination];
}

export const find_key= function(filter_data_day,like_location){
 return   filter_data_day.map((d) => {
  const found = Object.entries(like_location).find(
    ([key, value]) =>
      Array.isArray(value) &&
      d[0] === value[0] &&
      d[1] === value[1]
  );
  return found ? found[0] : null; // 매칭되는 key만 반환
}).filter(Boolean);

 
}


export const  count_day= function(to,from){
const diffDays = (to - from) / (1000 * 60 * 60 * 24);
return diffDays+1;

}