import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Star, MessageSquare, ThumbsUp, ThumbsDown, TrendingUp, 
  AlertCircle, Film, Search, Filter 
} from 'lucide-react';

// --- 1. 데이터 준비 (보고서 부록 데이터 기반) ---
const REVIEW_DATA = [
  { id: 1, score: 2, text: "또다른 pc의 희생양, pc는 영화계의 재앙이다", author: "jbpa****", date: "2025.11.17" },
  { id: 2, score: 7, text: "단순 오락영화 그 이상도 이하도 아닌 ... 그러나 롯데시네마 레이저관 사운드는 죽여준다고 할까?", author: "hite****", date: "2025.11.17" },
  { id: 3, score: 2, text: "댓글 알바 떨어지고 난 뒤, 슬슬 실 후기 달리면서 평점 실시간으로 나락가는 중 ㅋㅋㅋ 참고하세요.", author: "yjk0****", date: "2025.11.16" },
  { id: 4, score: 10, text: "스포일러가 포함된 감상평입니다.", author: "dyda****", date: "2025.11.16" },
  { id: 5, score: 10, text: "이런 영화 기다렸어요 나우유미씨 존잼!", author: "wsx2****", date: "2025.11.16" },
  { id: 6, score: 10, text: "아이재미있어라 꼭 보세유", author: "rlat****", date: "2025.11.16" },
  { id: 7, score: 10, text: "나우 유 씨미 3 오랫동안 기다렸어요~재밌게 잘 보고 왔습니다!!!이런 영화 너무 좋음.", author: "486k****", date: "2025.11.16" },
  { id: 8, score: 1, text: "너무 유치하고 재미가없음", author: "jhg3****", date: "2025.11.16" },
  { id: 9, score: 6, text: "1, 2편 다 본사람은 절대로 보지마세요 억지스러운 세대교체 진짜 별로에요", author: "thqu****", date: "2025.11.16" },
  { id: 10, score: 10, text: "오랜만에 나온 나우 유 씨 미 기다린 보람이 있는 영화였습니다", author: "fc06****", date: "2025.11.16" },
  { id: 11, score: 10, text: "너무 너무 너무 재밌어요!!", author: "agmr****", date: "2025.11.16" },
  { id: 12, score: 10, text: "진짜 보는내내 와 신기하다 와 하면서 봤어요 전 만족!", author: "luxu****", date: "2025.11.16" },
  { id: 13, score: 10, text: "초딩때 나우유씨미2 극장에서 보고... 옛날 친구들 다시 만난 것 같아서 너무 반갑고 그리웠다", author: "sys0****", date: "2025.11.16" },
  { id: 14, score: 10, text: "시간 순삭! 전 시리즈 다 챙겨봤는데 이번에도 역시 최고에요 ㅎ", author: "bak3****", date: "2025.11.16" },
  { id: 15, score: 1, text: "올해 최악의 영화. 기승 끝. 알고있던 나우유씨미 생각하고 가시면 정말 후회합니다.", author: "hcm4****", date: "2025.11.16" },
  { id: 16, score: 10, text: "진짜 좋아하는 시리즈였는데 3도 대박 !역시 너무 재밌고 시간가는줄 몰랐어요!!", author: "yuji****", date: "2025.11.16" },
  { id: 17, score: 1, text: "댓글에 속아 보러 갔다가 너무 실망했어요. 원수가 간다고 해도 말릴 영화", author: "bori****", date: "2025.11.16" },
  { id: 18, score: 10, text: "최애 영화입니다~~~", author: "jhs4****", date: "2025.11.16" },
  { id: 19, score: 6, text: "화려한 마술쇼 기대하고 봤는데 액션이 더많았던거 같고... 정체성을 잃은 아쉬운 편", author: "lsw5****", date: "2025.11.16" },
  { id: 20, score: 2, text: "나우유씨미2 재밌게 봤어서 기대하고 갔는데 대실망... 엉성하고 지루하고 유치함", author: "sang****", date: "2025.11.16" },
  { id: 21, score: 10, text: "원 투 재밌게본 사람으로써 3도 보는맛이 있었음ㅎ", author: "jmyo****", date: "2025.11.16" },
  { id: 22, score: 8, text: "여윽시 실망시키지 않음 !!", author: "dlsw****", date: "2025.11.16" },
  { id: 23, score: 1, text: "이거 10점 준 사람들은 전 편들을 안 본 건가요..? 스토리는 말도 안되고 빌런도 약하고", author: "sh20****", date: "2025.11.16" },
  { id: 24, score: 1, text: "13일에 보고 왔는대 다시 생각해도 화나서 리뷰남김", author: "rgs0****", date: "2025.11.16" },
  { id: 25, score: 10, text: "캐릭터마다 숨겨진 이야기들이 하나씩 드러날 때마다 집중도 쭉 올라가서 시간 가는 줄 모르고 봤어요!", author: "kell****", date: "2025.11.16" },
  { id: 26, score: 10, text: "끝까지 놓칠 수 없는 전개. 마지막 퍼즐이 맞춰지는 순간 소름ㅎ", author: "hhjl****", date: "2025.11.16" },
  { id: 27, score: 10, text: "시즌1부터 기대했던 작품인데역시 기대를 저버리지않네용", author: "eb0_****", date: "2025.11.16" },
  { id: 28, score: 10, text: "스포일러가 포함된 감상평입니다.", author: "seal****", date: "2025.11.16" },
  { id: 29, score: 10, text: "존잼입니다 정주행ㄱㄱ", author: "juuj****", date: "2025.11.16" },
  { id: 30, score: 10, text: "복선부터 연출 그리고 반전이 진짜 미쳤음", author: "gwon****", date: "2025.11.16" },
  { id: 31, score: 1, text: "장면 전환이고 스토리고 충격적으로 조잡해서 집중을 할래야 할 수가 없음.", author: "livi****", date: "2025.11.16" },
  { id: 32, score: 10, text: "재밌네요!!!재밌게봤어요", author: "dpvm****", date: "2025.11.16" },
  { id: 33, score: 10, text: "시즌별로 재밌게보는건데 이번편도 재밌게봤어요 ㅎㅎ", author: "leee****", date: "2025.11.16" },
  { id: 34, score: 1, text: "정말 쓰레기같은 영화였음 이렇게 시간이랑 돈아까운 영화는 오랜만", author: "ksm9****", date: "2025.11.16" },
  { id: 35, score: 4, text: "영화가 전작주인공들을 바보로 만들었음", author: "jung****", date: "2025.11.16" },
  { id: 36, score: 9, text: "흥미롭게 볼만했으나, 너무 신캐릭에 몰아줘서 이전 주인공들의 매력이 너무 떨어짐ㅜ", author: "wnsg****", date: "2025.11.16" },
  { id: 37, score: 1, text: "실망이큼 시리즈중 제일노잼임", author: "jme0****", date: "2025.11.16" },
  { id: 38, score: 10, text: "기술력이 보이는 영화였습니당", author: "rlae****", date: "2025.11.16" },
  { id: 39, score: 2, text: "이걸 3편이라고.... 하라는 마술은 안하고 대사가 너무 많았고 끝까지 뭔가 마술은 안나옴....", author: "yoon****", date: "2025.11.16" },
  { id: 40, score: 10, text: "영화 정말 끝내주네요~", author: "mjk7****", date: "2025.11.16" },
  { id: 41, score: 10, text: "나우 유 씨 미 3 존잼 !!! 다들 보세요", author: "h22e****", date: "2025.11.16" },
  { id: 42, score: 10, text: "오랜만에 너무 재밌는 영화를 본거같애요ㅠㅠㅠㅠ최고에요", author: "dlau****", date: "2025.11.16" },
  { id: 43, score: 10, text: "진짜 인생 영화 .... 사랑해여 너무 재밌어여...", author: "hahy****", date: "2025.11.16" },
  { id: 44, score: 2, text: "스포일러가 포함된 감상평입니다.", author: "dlgk****", date: "2025.11.16" },
  { id: 45, score: 1, text: "1,2 편 때문에 기대했는데 너무 유치하기 그지없네요..", author: "bjye****", date: "2025.11.16" },
  { id: 46, score: 2, text: "노잼노잼노잼 세대교체 대실패 주인공들 매력도 없도", author: "love****", date: "2025.11.16" },
  { id: 47, score: 10, text: "최근 본 영화중 제일 재밌게 봤습니당 굳굳", author: "kmjj****", date: "2025.11.16" },
  { id: 48, score: 10, text: "상승과 하강의 미묘한 조합.", author: "gg48****", date: "2025.11.16" },
  { id: 49, score: 2, text: "보는내내 유치했음 1,2에ㅜ비하면 완전망작", author: "user49", date: "2025.11.16" },
];

const KEYWORD_DATA = [
  { keyword: "재미/존잼", count: 18, type: "positive" },
  { keyword: "실망/최악", count: 12, type: "negative" },
  { keyword: "시간(순삭)", count: 7, type: "positive" },
  { keyword: "유치함", count: 6, type: "negative" },
  { keyword: "스토리/개연성", count: 5, type: "negative" },
  { keyword: "시리즈/추억", count: 5, type: "positive" },
  { keyword: "알바(의심)", count: 3, type: "negative" },
  { keyword: "PC/세대교체", count: 3, type: "negative" },
];

const COLORS = {
  positive: '#4f46e5', // Indigo 600
  negative: '#ef4444', // Red 500
  neutral: '#9ca3af',  // Gray 400
  text: '#1f2937',
};

export default function ReviewDashboard() {
  const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative'

  // --- 2. 데이터 가공 및 계산 ---
  const stats = useMemo(() => {
    const total = REVIEW_DATA.length;
    const sum = REVIEW_DATA.reduce((acc, cur) => acc + cur.score, 0);
    const average = (sum / total).toFixed(1);
    
    const positiveCount = REVIEW_DATA.filter(r => r.score >= 8).length;
    const negativeCount = REVIEW_DATA.filter(r => r.score <= 3).length;
    const neutralCount = total - positiveCount - negativeCount;

    return { total, average, positiveCount, negativeCount, neutralCount };
  }, []);

  const chartData = useMemo(() => {
    // Pie Chart Data
    const sentiment = [
      { name: '긍정 (8-10점)', value: stats.positiveCount, color: COLORS.positive },
      { name: '부정 (1-3점)', value: stats.negativeCount, color: COLORS.negative },
      { name: '중립 (4-7점)', value: stats.neutralCount, color: COLORS.neutral },
    ];

    // Bar Chart Data (Score Distribution)
    const distribution = Array.from({ length: 10 }, (_, i) => ({
      score: i + 1,
      count: REVIEW_DATA.filter(r => r.score === i + 1).length
    }));

    return { sentiment, distribution };
  }, [stats]);

  const filteredReviews = useMemo(() => {
    if (filter === 'positive') return REVIEW_DATA.filter(r => r.score >= 8);
    if (filter === 'negative') return REVIEW_DATA.filter(r => r.score <= 3);
    return REVIEW_DATA;
  }, [filter]);

  // --- 3. 컴포넌트 렌더링 ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Film className="w-8 h-8 text-indigo-600" />
              나우 유 씨 미 3 <span className="text-lg font-normal text-slate-500">관람객 반응 대시보드</span>
            </h1>
            <p className="text-slate-500 mt-2">데이터 기준: 2025.11.16 ~ 11.17 (총 49건)</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">분석완료</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">실시간</span>
          </div>
        </div>
      </header>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="총 리뷰 수" 
          value={`${stats.total}건`} 
          icon={<MessageSquare className="w-6 h-6 text-blue-500" />} 
          bgColor="bg-white"
        />
        <MetricCard 
          title="평균 평점" 
          value={`${stats.average} / 10`} 
          subtext="극단적 호불호 양상"
          icon={<Star className="w-6 h-6 text-yellow-500" />} 
          bgColor="bg-white"
        />
        <MetricCard 
          title="긍정 평가 (8점↑)" 
          value={`${((stats.positiveCount / stats.total) * 100).toFixed(0)}%`} 
          subtext={`${stats.positiveCount}명 만족`}
          icon={<ThumbsUp className="w-6 h-6 text-indigo-500" />} 
          bgColor="bg-indigo-50"
          borderColor="border-indigo-100"
        />
        <MetricCard 
          title="부정 평가 (3점↓)" 
          value={`${((stats.negativeCount / stats.total) * 100).toFixed(0)}%`} 
          subtext={`${stats.negativeCount}명 불만족`}
          icon={<ThumbsDown className="w-6 h-6 text-red-500" />} 
          bgColor="bg-red-50"
          borderColor="border-red-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Score Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            평점 분포 (Score Distribution)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.distribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="score" label={{ value: '평점 (점)', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="count" name="리뷰 수" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-2 text-center">
            10점과 1-2점에 몰린 <strong>U자형 양극화</strong> 패턴이 뚜렷함
          </p>
        </div>

        {/* Sentiment Pie Chart & Keywords */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            감성 분석 및 주요 키워드
          </h2>
          <div className="flex flex-col md:flex-row gap-6 h-full">
            <div className="w-full md:w-1/2 h-48 md:h-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.sentiment}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.sentiment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 overflow-y-auto">
              <h3 className="text-sm font-medium text-slate-500 mb-2">자주 언급된 키워드 TOP 8</h3>
              <div className="space-y-2">
                {KEYWORD_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.type === 'positive' ? 'bg-indigo-500' : 'bg-red-500'}`}></span>
                      <span className="text-slate-700 font-medium">{item.keyword}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${item.type === 'positive' ? 'bg-indigo-400' : 'bg-red-400'}`} 
                          style={{ width: `${(item.count / 18) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-400 w-6 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" /> 긍정적 반응 요인
          </h3>
          <ul className="list-disc list-inside text-indigo-800 text-sm space-y-1">
            <li><strong>오락성:</strong> 복잡한 생각 없이 즐기는 킬링타임용</li>
            <li><strong>팬심:</strong> 1, 2편 멤버들의 귀환과 추억 보정</li>
            <li><strong>연출:</strong> 마지막 반전과 특수관(사운드) 경험 만족</li>
          </ul>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> 부정적 반응 요인
          </h3>
          <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
            <li><strong>스토리:</strong> 개연성 부족 및 급한 전개, 유치함</li>
            <li><strong>정체성:</strong> 마술보다 액션 위주, 무리한 세대교체</li>
            <li><strong>신뢰도:</strong> 평점에 대한 불신(댓글 알바 의혹)</li>
          </ul>
        </div>
      </div>

      {/* Review List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-400" />
            상세 리뷰 목록
          </h2>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              전체 보기
            </button>
            <button 
              onClick={() => setFilter('positive')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'positive' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              호평 (8-10)
            </button>
            <button 
              onClick={() => setFilter('negative')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'negative' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              악평 (1-3)
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                      review.score >= 8 ? 'bg-indigo-100 text-indigo-700' : 
                      review.score <= 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {review.score}
                    </span>
                    <span className="text-xs text-slate-400">{review.date} | {review.author}</span>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400">
              해당 조건의 리뷰가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtext, icon, bgColor, borderColor = 'border-slate-200' }) {
  return (
    <div className={`${bgColor} p-6 rounded-xl border ${borderColor} shadow-sm`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {subtext && <div className="text-xs text-slate-500 mt-1">{subtext}</div>}
    </div>
  );
}
