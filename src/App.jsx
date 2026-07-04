import { useState, useRef, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────
const JOBS = [
  { id:"writing", ill:"writing", name:"Webライター", income:"月1〜10万円", diff:"初心者OK", time:"週3h〜",
    tags:["在宅","文章","スキマ"], time_v:["mid","lots"], skill_v:["pc","any"], goal_v:["low","mid"],
    desc:"クラウドワークス・ランサーズで記事を書きます。スキル不要で始めやすく、経験を積むほど単価が上がります。",
    step:[
      {title:"クラウドワークスに無料登録", detail:"クラウドワークスやランサーズは日本最大級のクラウドソーシングサイトです。メールアドレスがあれば5分で無料登録できます。最初のプロフィール設定が、案件獲得の成否を大きく分けます。本人確認の手続きは必須ですので、マイナンバーカードや運転免許証を用意しておきましょう。", tips:["プロフィール写真は顔の見える明るい写真を使うと信頼度UP","自己紹介には書ける分野（IT・グルメ・健康など）を3つ明記","クラウドワークスとランサーズの両方に登録すると案件の幅が広がる"], ill:"stepStart"},
      {title:"初心者向け案件に応募", detail:"登録後は「初心者歓迎」「未経験OK」のタグがついた案件から始めるのがおすすめです。最初は文字単価0.5〜1円程度でも、評価を積むことが何より重要です。クラウドソーシングは過去の評価が次の仕事の獲得に直結する世界です。", tips:["応募メッセージはテンプレ感を出さず、案件内容を読んで具体的に書く","納期は必ず守る。早めの納品で信頼を積む","最初の10件は経験を積むつもりで、単価より評価を優先"], ill:"stepAction"},
      {title:"実績を積んで単価UP", detail:"10〜20件こなしたら、徐々に単価交渉を始めましょう。SEOライティングやWebマーケティングの知識を身につけると、文字単価が0.5円→2円→5円と段階的に上がります。月収10万円を超えるWebライターも多くいます。", tips:["得意ジャンルを絞る（例：転職系・美容系・IT系）","SEOの基礎知識を本やUdemyで学ぶ","Twitterなどでポートフォリオを発信して案件を引き寄せる"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"delivery", ill:"delivery", name:"フードデリバリー", income:"月1〜8万円", diff:"初心者OK", time:"週2h〜",
    tags:["体を動かす","即収入","スキマ"], time_v:["little","mid"], skill_v:["physical","any"], goal_v:["low"],
    desc:"Uber Eatsや出前館で料理を届けます。登録してすぐ稼げる即金性が魅力。時間の自由度も高いです。",
    step:[
      {title:"UberEats配達員に登録", detail:"Uber Eatsの公式サイトから配達パートナーに申し込みます。本人確認書類とプロフィール写真をアップロード後、審査が完了するまで通常2〜5日かかります。配達バッグは別途購入が必要ですが、Amazonで2,000〜5,000円程度で入手できます。", tips:["本人確認はマイナンバーカードがあるとスムーズ","配達バッグはAmazonで2,000〜5,000円で購入可能","出前館・menuなど他社にも登録すると案件選択肢が広がる"], ill:"stepStart"},
      {title:"スマホアプリで受注", detail:"配達員アプリを起動して「オンライン」にすると、近くの飲食店から配達依頼が届きます。報酬や距離を見て、受注するかその場で判断できます。お昼や夜の食事時間帯がピークで、効率よく稼ぐコツです。", tips:["ピークタイム（11-14時・18-21時）に稼働すると効率的","雨の日は需要が増え、ボーナスが付くことも多い","受ける配達は距離・報酬・店までの近さで判断"], ill:"stepAction"},
      {title:"自転車・バイクで配達", detail:"店舗で料理を受け取り、お客様の元へ配達します。アプリのナビ機能を使って効率的に動きましょう。経験を積むと、1時間あたり1,500〜2,500円稼げるようになります。雨天や繁忙期はさらに高単価になります。", tips:["電動アシスト自転車があると疲労が大幅に減る","効率的なエリア（オフィス街・住宅街）を覚える","料理がこぼれないよう、出発前にバッグの中で固定する"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"programming", ill:"programming", name:"プログラミング", income:"月5〜50万円", diff:"学習3〜6ヶ月", time:"週5h〜",
    tags:["高単価","将来性","在宅"], time_v:["lots"], skill_v:["pc"], goal_v:["mid","high"],
    desc:"WebサイトやアプリをつくるITスキル。習得に時間がかかりますが、高単価案件が多く将来性があります。",
    step:[
      {title:"Progate・Udemyで学習", detail:"プログラミング学習は「Progate」や「Udemy」がおすすめです。初心者にはHTML/CSS→JavaScript→Reactの順番で学ぶのが王道。1日1時間×3ヶ月で基礎が身につきます。挫折しないためには毎日少しずつ続けることが何より大切です。", tips:["最初の言語はHTML/CSSから始めるのが挫折しにくい","Udemyのセールで1,500円程度のコースを買うとコスパ◎","毎日30分でも継続することが何より大事"], ill:"stepStart"},
      {title:"ポートフォリオ作成", detail:"学習後は実際にWebサイトやアプリを作ってGitHubで公開します。これがあなたの「営業ツール」になります。クライアントワークを受ける前に、3〜5個の作品をつくっておきましょう。実在のサービスを真似して作るのが学習効率も高くおすすめです。", tips:["ポートフォリオサイトを自分で作って公開する","GitHubに必ずREADMEを書いて作品を解説","実在のサービスを真似て作るのが学習効率◎"], ill:"stepAction"},
      {title:"クラウドワークスで案件獲得", detail:"ポートフォリオが完成したら、クラウドワークスなどで「HP制作」「LP制作」案件に応募します。最初は5〜10万円程度の案件から始め、徐々に大きな案件にステップアップしていきましょう。1年経過すれば月20〜50万円の案件も視野に入ります。", tips:["応募時はポートフォリオURLを必ず添付","見積もりは相場より少し安めで信頼を獲得","1年経過すれば月20-50万円の案件も視野に"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"design", ill:"design", name:"Webデザイン", income:"月3〜30万円", diff:"学習1〜3ヶ月", time:"週4h〜",
    tags:["創作","在宅","成長性"], time_v:["mid","lots"], skill_v:["creative","pc"], goal_v:["mid","high"],
    desc:"バナー・SNS画像・LPのデザイン制作。Canva/Figmaを使えば比較的早く案件獲得できます。",
    step:[
      {title:"Figma・Canvaで練習", detail:"Webデザインを始めるなら、Figma（無料）またはCanvaから始めましょう。YouTube動画で基本操作を学び、まずは既存サイトの模写から練習します。1ヶ月でツール操作に慣れて、自分のオリジナル作品が作れるようになります。", tips:["Figmaコミュニティで人気テンプレートを研究","YouTubeで「Figma 初心者」検索して動画で学ぶ","Pinterestでデザインのインスピレーション収集"], ill:"stepStart"},
      {title:"架空案件でポートフォリオ作成", detail:"実在のお店やサービスを想定して、自分でデザインを作っていきます。バナー・LP・SNS投稿画像など、3〜5個の作品を作ってBehanceやTwitterで発信しましょう。「1日1バナーチャレンジ」を30日間続けると圧倒的に上達します。", tips:["1日1バナーチャレンジを30日間続ける","色使い・フォント選び・余白の3要素を意識","SNSで作品発信して反応を分析"], ill:"stepAction"},
      {title:"クラウドソーシングで受注", detail:"ポートフォリオが揃ったら、クラウドワークス・ココナラ・SNS経由で案件を受注します。バナー1枚3,000〜10,000円、LPデザインは50,000円〜が相場です。リピーターを作れれば月10〜30万円の安定収入になります。", tips:["ココナラで自分のスキルを商品として出品","Twitterで作品＋PRで認知度UP","リピーターを大切にすると安定収入に"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"youtube", ill:"youtube", name:"YouTube・動画編集", income:"月0〜青天井", diff:"中〜長期", time:"週5h〜",
    tags:["創作","ストック型","長期"], time_v:["lots"], skill_v:["creative"], goal_v:["high"],
    desc:"動画で広告収益や企業案件を得ます。結果まで6ヶ月〜1年かかりますが、軌道に乗ると大きな収入になります。",
    step:[
      {title:"チャンネル開設・方向性決め", detail:"Googleアカウントから無料でチャンネルを開設できます。最も大切なのは「ジャンル選び」です。自分が情熱を持って続けられるテーマで、競合が少ないニッチを狙うのが成功の鍵です。サムネとタイトルが視聴回数の80%を決めると言われています。", tips:["好きなこと×得意なこと×需要のあることの交差点を探す","競合チャンネルを5つ研究して差別化ポイントを考える","サムネとタイトルが視聴回数の80%を決める"], ill:"stepStart"},
      {title:"週1〜2本ペースで投稿", detail:"最初の100本は「実験」と思って投稿し続けましょう。動画編集はDaVinci Resolve（無料）やCapCutで始められます。撮影・編集・サムネ作成で1本5〜10時間ほどかかります。続ける根気が成功の最大の壁です。", tips:["テロップ・効果音・BGMで離脱率を下げる","最初の15秒で視聴者の興味を引く工夫","週1本×3ヶ月続ける根気が最大の壁"], ill:"stepAction"},
      {title:"1000人超で収益化申請", detail:"登録者1,000人＆総再生時間4,000時間以上で収益化申請ができます。広告収入だけでなく、企業案件・自社商品販売・メンバーシップなど多角的に収益化できるのがYouTubeの強みです。軌道に乗れば月収100万円超も狙えます。", tips:["収益化までの平均期間は1〜2年","登録者数より滞在時間が広告収益を左右","案件単価は登録者数×0.5〜2円が相場"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"teaching", ill:"teaching", name:"オンライン家庭教師", income:"月2〜15万円", diff:"得意科目が必要", time:"週3h〜",
    tags:["話す","高時給","教育"], time_v:["mid","lots"], skill_v:["talking"], goal_v:["mid","high"],
    desc:"得意科目や資格を活かして教えます。時給1,500〜5,000円以上も可能で、学歴や資格があると有利です。",
    step:[
      {title:"家庭教師マッチングサービスに登録", detail:"マナリンク、まなぶてらす、家庭教師のトライ、家庭教師のファーストなどに登録します。学歴・指導可能科目・料金などをプロフィールに記載します。難関大卒や国家資格があると単価が上がりやすく、複数のマッチングサイトに登録するのが収入安定のコツです。", tips:["難関大学や国家資格があると単価が上がりやすい","複数のマッチングサイトに登録して案件確保","プロフィール写真は明るく清潔感のあるものを使用"], ill:"stepStart"},
      {title:"プロフィール充実", detail:"他の教師との差別化のため、プロフィールに「指導方針」「実績」「対応可能曜日」を丁寧に書きます。動画自己紹介をアップできるサービスもあり、対応すると採用率が大きく上がります。返信の速さも保護者の評価ポイントです。", tips:["対応可能科目を具体的に（小5算数の文章題が得意など）","指導実績がない場合は身近な人を教えた経験でもOK","返信は早く・丁寧に（生徒・保護者は迅速さを評価）"], ill:"stepAction"},
      {title:"生徒とのオンライン授業", detail:"Zoom・Google Meet・Skypeなどで授業を行います。時給は1,500〜5,000円が相場です。生徒との信頼関係ができれば、長期契約で安定収入になります。保護者への定期報告で評価を高めましょう。", tips:["オンライン用ホワイトボード（Miro・Jamboard）を活用","授業の最後に次回までの宿題を必ず出す","保護者にも月1回の進捗報告で信頼アップ"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
  { id:"mercari", ill:"mercari", name:"メルカリ・ネット販売", income:"月1〜5万円", diff:"初心者OK", time:"週2h〜",
    tags:["在宅","初心者向け","スキマ"], time_v:["little","mid"], skill_v:["any"], goal_v:["low"],
    desc:"不用品を売ることから始められます。慣れたら仕入れ販売（転売）に移行する人も多いです。",
    step:[
      {title:"メルカリアプリ登録", detail:"メルカリは無料で登録できます。アカウント作成後、本人確認（マイナンバーカードか免許証）を行うと取引がスムーズになります。電話番号認証も忘れずに完了させましょう。招待コードを使うと500ポイントもらえます。", tips:["招待コードを使って500ポイント獲得","本人確認すると売上金を即時振込できる","プロフィールに丁寧な挨拶を書くと信頼度UP"], ill:"stepStart"},
      {title:"家にある不用品を出品", detail:"まずは家にある不用品から出品しましょう。本・服・家電・小物などが売れやすいです。商品写真は明るい場所で4〜10枚撮るのが鉄則です。商品名にはブランド名・サイズを必ず入れて、検索に引っかかるようにしましょう。", tips:["売れる時間帯は土日の20-22時","競合と比較して価格を5-10%安めに設定","コメントへの返信は24時間以内に"], ill:"stepAction"},
      {title:"梱包・発送", detail:"売れたら24時間以内に発送するのがマナーです。梱包資材はダイソーやコンビニで購入できます。メルカリ便（らくらく・ゆうゆう）を使うと匿名配送で安心です。発送後の連絡で評価率が大きく変わります。", tips:["プチプチ・OPP袋・ガムテープは100均でまとめ買い","メルカリ便なら最安175円から送れる","発送通知後のお礼コメントで評価率UP"], ill:"stepGrow"}
    ],
    tax_note:"不用品売却は原則非課税（営業的な販売は課税）" },
  { id:"data", ill:"data", name:"データ入力・事務", income:"月1〜3万円", diff:"初心者OK", time:"週2h〜",
    tags:["PC","初心者向け","スキマ"], time_v:["little"], skill_v:["pc","any"], goal_v:["low"],
    desc:"表計算や情報整理などのシンプルな作業。単価は低めですが、特別なスキルが不要ですぐ始められます。",
    step:[
      {title:"クラウドワークスで「データ入力」検索", detail:"クラウドワークス・ランサーズで「データ入力」「タスク」と検索すると、初心者向け案件がたくさん見つかります。タスク形式は1件10〜100円で即金性が高く、すぐ始められます。プロジェクト形式なら継続契約も狙えます。", tips:["タスク形式は1件10〜100円で気軽に開始可能","プロジェクト形式は単価が高く継続契約も狙える","未経験OK・初心者歓迎のタグを目印に"], ill:"stepStart"},
      {title:"スキルチェックに合格", detail:"クラウドワークスにはタイピング速度や基本スキルを測るテストがあります。これに合格するとプロフィールにバッジが表示され、案件獲得率が大きく上がります。e-typingなどの無料サイトで予習しておくと安心です。", tips:["タイピングは1分間50文字以上を目指す","Excelの基本操作（SUM・COUNTIF）を覚える","e-typingで無料タイピング練習"], ill:"stepAction"},
      {title:"案件に応募・納品", detail:"応募時は案件内容をしっかり読み、簡潔で丁寧な提案文を送ります。納品は指定された形式（Excel・Googleスプレッドシートなど）を必ず守ります。継続案件を獲得できれば月3万円程度の安定収入になります。", tips:["応募メッセージは100〜200文字で簡潔に","ミスゼロで納品して継続依頼を獲得","5件以上こなして高評価を維持"], ill:"stepGrow"}
    ],
    tax_note:"年20万円超で確定申告が必要" },
];

const LISTINGS = {
  writing: [
    { name: "クラウドワークス", tagline: "国内最大級・案件数No.1", badge: "初心者◎",
      desc: "初心者歓迎の案件が多数。登録無料で5分で始められる定番のサイト。", url: "https://crowdworks.jp/" },
    { name: "ランサーズ", tagline: "高単価案件に強い", badge: "高単価",
      desc: "認定ランサー制度で信頼が積み上がる。文字単価2円〜の案件も豊富。", url: "https://www.lancers.jp/" },
  ],
  delivery: [
    { name: "Uber Eats", tagline: "業界最大手", badge: "定番",
      desc: "全国対応・即金性◎。配達バッグは別途購入が必要だが、案件数は最多。", url: "https://www.uber.com/jp/ja/drive/" },
    { name: "出前館", tagline: "報酬が安定", badge: "安定",
      desc: "配達単価が固定で計算しやすい。ブーストキャンペーン時の報酬がアツい。", url: "https://service.demae-can.co.jp/gig_personal/" },
    { name: "Wolt", tagline: "サポートが手厚い", badge: "高報酬",
      desc: "対応エリアは限定的だが報酬は高め。配達員サポートが好評。", url: "https://wolt.com/ja/jpn/courier" },
  ],
  programming: [
    { name: "クラウドワークス", tagline: "案件量で選ぶなら", badge: "初心者◎",
      desc: "HP制作・LP制作案件が常時数千件。経験を積みたい初心者にぴったり。", url: "https://crowdworks.jp/" },
    { name: "ランサーズ", tagline: "実績を積むのに最適", badge: "実績◎",
      desc: "認定エンジニア制度あり。継続案件が獲得しやすく長期収入も狙える。", url: "https://www.lancers.jp/" },
    { name: "レバテックフリーランス", tagline: "高単価エンジニア向け", badge: "高単価",
      desc: "実務経験者向け。月収50万〜100万円の案件多数。スキル次第で大きく稼げる。", url: "https://freelance.levtech.jp/" },
  ],
  design: [
    { name: "ココナラ", tagline: "スキル販売型", badge: "出品型",
      desc: "自分の得意を「商品」として出品。価格も自分で設定できて自由度◎。", url: "https://coconala.com/" },
    { name: "クラウドワークス", tagline: "デザインコンペが豊富", badge: "コンペ◎",
      desc: "ロゴ・バナーのコンペ案件で実績作り。報酬は3,000円〜数万円が中心。", url: "https://crowdworks.jp/" },
    { name: "Behance", tagline: "海外案件にもチャンス", badge: "ポートフォリオ",
      desc: "Adobeが運営。作品を公開してスカウトされる仕組みでチャンスが広がる。", url: "https://www.behance.net/" },
  ],
  youtube: [
    { name: "YouTube Studio", tagline: "チャンネル運営の本拠地", badge: "公式",
      desc: "Googleアカウントで即開設。動画投稿・収益化はすべてここから。", url: "https://studio.youtube.com/" },
    { name: "クラウドワークス", tagline: "動画編集の受注", badge: "案件",
      desc: "動画編集の代行案件が常時掲載。1本3,000円〜が相場で経験を積みやすい。", url: "https://crowdworks.jp/" },
    { name: "ココナラ", tagline: "編集スキルを販売", badge: "出品型",
      desc: "編集パッケージを商品化して受注。リピーター獲得で安定収入に。", url: "https://coconala.com/" },
  ],
  teaching: [
    { name: "マナリンク", tagline: "プロ向け直接契約型", badge: "自由度◎",
      desc: "個人で生徒と直接契約。手数料が安く、自分のペースで働ける。", url: "https://manalink.jp/" },
    { name: "まなぶてらす", tagline: "フリーランス講師向け", badge: "サポート◎",
      desc: "収入補助プログラムあり。講師同士の助け合いカルチャーが特徴。", url: "https://www.manatera.com/" },
    { name: "家庭教師のトライ", tagline: "業界最大手", badge: "案件豊富",
      desc: "CMでおなじみの大手。生徒数全国No.1で紹介案件が豊富、研修も充実。", url: "https://www.trygroup.co.jp/invite/" },
    { name: "家庭教師のファースト", tagline: "高時給・全国対応", badge: "高時給",
      desc: "平均時給2,421円と業界最高水準。対面・オンライン両方に対応。", url: "https://www.kyoushi1.net/to-tutor/" },
  ],
  mercari: [
    { name: "メルカリ", tagline: "国内No.1フリマアプリ", badge: "売れる◎",
      desc: "利用者数No.1で買い手が多くて売れやすい。手数料は10%。", url: "https://www.mercari.com/jp/" },
    { name: "ラクマ", tagline: "手数料が安い", badge: "手数料◎",
      desc: "楽天運営。手数料6%でメルカリより低い。楽天ポイント連携も◎。", url: "https://fril.jp/" },
    { name: "Yahoo!フリマ", tagline: "PayPayと連携", badge: "PayPay",
      desc: "PayPay残高で売上を即使える。手数料5%で業界最安級。", url: "https://paypayfleamarket.yahoo.co.jp/" },
  ],
  data: [
    { name: "クラウドワークス", tagline: "タスク案件が豊富", badge: "初心者◎",
      desc: "1件10円〜のタスクから本格的なデータ入力まで幅広い案件あり。", url: "https://crowdworks.jp/" },
    { name: "ランサーズ", tagline: "継続案件あり", badge: "継続案件",
      desc: "プロジェクト形式で月数万円の安定収入を狙えるのが強み。", url: "https://www.lancers.jp/" },
    { name: "シュフティ", tagline: "主婦・初心者特化", badge: "在宅◎",
      desc: "主婦・在宅ワーカー向けの初心者OK案件が多数掲載されている。", url: "https://app.shufti.jp/" },
  ],
};

const QUIZ = [
  { id:"time", q:"副業に使える時間は週どのくらい？",
    opts:[{l:"週1〜2時間",v:"little"},{l:"週3〜5時間",v:"mid"},{l:"週10時間以上",v:"lots"}] },
  { id:"skill", q:"得意なこと・やりたいことは？",
    opts:[{l:"PC作業・文章",v:"pc"},{l:"デザイン・創作",v:"creative"},
          {l:"話す・教える",v:"talking"},{l:"体を動かす",v:"physical"},{l:"特になし",v:"any"}] },
  { id:"goal", q:"目標の月収は？",
    opts:[{l:"月1〜3万円",v:"low"},{l:"月3〜10万円",v:"mid"},{l:"月10万円以上",v:"high"}] },
];

const TAX_BRACKETS = [
  [1950000,0.05,0],[3300000,0.1,97500],[6950000,0.2,427500],
  [9000000,0.23,636000],[18000000,0.33,1536000],[40000000,0.4,2796000],[Infinity,0.45,4796000]
];

// ─── LOCAL FAQ (Naru's responses) ──────────────────
const FAQ = [
  // Greetings
  { kw: ["こんにちは", "こんばんは", "おはよう", "はじめまして", "よろしく", "やあ", "hi", "hello"],
    reply: "こんにちは！ボクは「ナル」だよ🌱 副業・確定申告・NISAのことなら何でも聞いてね💰" },
  { kw: ["ありがとう", "サンキュー", "助かった", "わかった", "なるほど"],
    reply: "どういたしまして〜！また何かわからないことがあったら、いつでも聞いてね🌱✨" },
  { kw: ["お前は誰", "名前", "あなた", "君は", "誰"],
    reply: "ボクは「ナル」って言うんだ🌱 コインの体に新芽が生えた、お金が育つ妖精だよ。キミのお金の「わからない」を「わかった！」にするお手伝いをするね💰" },

  // 副業 specific scenarios
  { kw: ["20万", "二十万", "20万円", "二十万円"],
    reply: "副業の純利益（収入−経費）が年20万円を超えたら、確定申告が必要だよ🌱 翌年の2/16〜3/15が申告期間。無申告は追徴課税のリスクがあるから注意してね！" },
  { kw: ["バレない", "ばれない", "バレる", "ばれる", "会社にバレ", "副業バレ", "内緒"],
    reply: "会社にバレないコツは住民税を「自分で納付（普通徴収）」にすること💡 確定申告のときに選べるよ。あと副業を会社の同僚に話さないのも基本だね！ただし就業規則で副業禁止の会社もあるから要確認🌱" },
  { kw: ["稼げる", "稼ぐ", "高単価", "儲かる", "副業 おすすめ"],
    reply: "短期で稼ぐならフードデリバリー🛵、スキルを伸ばすならプログラミング💻やWebデザイン🎨が高単価だよ！「副業」タブの診断で自分に合うのを探してみてね🌱" },
  { kw: ["どんな副業", "副業 種類", "副業何", "副業 始め方"],
    reply: "副業は時間・スキル・目標額で選ぶといいよ💼 PC得意ならWebライターやデータ入力、体動かすのが好きならフードデリバリー！「副業」タブの3問診断ですぐ見つかるよ🌱" },

  // 確定申告 specific
  { kw: ["忘れ", "申告忘れ", "期限切れ", "過ぎた", "遅れ", "遅れた"],
    reply: "確定申告を忘れちゃっても「期限後申告」ができるよ💦 ただし無申告加算税や延滞税がかかることがあるから、気づいたらすぐ税務署に相談を！自主的な申告なら加算税が軽くなることもあるよ🌱" },
  { kw: ["やり方", "方法", "どうやって", "申告書", "書類"],
    reply: "国税庁の「確定申告等作成コーナー」が無料で便利だよ💻 質問に答えるだけで書類が完成。マイナンバーカードがあればスマホからe-Taxで提出もできるよ🌱 freeeやマネーフォワードのソフトも人気！" },
  { kw: ["経費", "けいひ", "節税"],
    reply: "副業に使ったお金は経費として計上できるよ📝 PC・書籍・通信費の一部・打ち合わせのカフェ代も対象になることが多いんだ。経費が増えると課税所得が減って税金も安くなるよ💰" },
  { kw: ["いつ", "期間", "いつまで", "申告 時期"],
    reply: "確定申告は毎年2月16日〜3月15日が期間だよ📅 この期間内に、前年（1月〜12月）の所得を申告するんだ。早めに準備するとスムーズだよ🌱" },
  { kw: ["住民税", "じゅうみんぜい"],
    reply: "住民税は前年の所得に対してかかるよ📋 副業所得が20万円以下で確定申告不要でも、住民税の申告は必要な場合があるから注意！詳しくは市区町村の窓口で確認してね🌱" },

  // NISA specific
  { kw: ["何歳", "年齢", "始める年齢"],
    reply: "NISAは18歳から始められるよ🌱 でも「いつ始めるか」より「早く始めるか」が大切！20代でも30代でも、思い立ったその日が一番のはじめ時。少額からでもOKだよ💰" },
  { kw: ["証券会社", "口座開設", "おすすめ 証券"],
    reply: "ネット証券のSBI証券・楽天証券・マネックス証券あたりが人気だよ🏦 手数料が安くて、NISA対応も充実してる。楽天ユーザーなら楽天証券が便利かも💡" },
  { kw: ["オルカン", "S&P500", "S&P", "全世界", "インデックス", "投資信託"],
    reply: "「オルカン（全世界株式）」や「S&P500」は初心者に人気のインデックスファンドだよ🌱 世界中の企業に自動で分散投資できるんだ。長期で持ち続けるのが基本の戦略！" },
  { kw: ["いくら", "毎月", "積立 額", "積立額"],
    reply: "NISAは月5,000円からでも始められるよ🌱 まずは無理のない金額から始めて、慣れたら少しずつ増やすのが◎。「NISA」タブのシミュレーターで将来の資産をシミュレーションできるよ💰" },
  { kw: ["損", "下がる", "リスク", "元本割れ"],
    reply: "短期では値下がりすることもあるよ💦 でも長期（10〜20年）でインデックスファンドに積み立てた場合、歴史的には損失になるケースは稀だよ🌱 大事なのは長く続けること！" },
  { kw: ["iDeCo", "イデコ"],
    reply: "iDeCoは老後資金のための私的年金制度だよ🌱 NISAと違って60歳まで引き出せないけど、掛金が全額所得控除されるから節税効果はバツグン✨ NISAと併用するのが理想的！" },

  // ふるさと納税
  { kw: ["ふるさと納税", "ふるさと", "返礼品"],
    reply: "ふるさと納税は、好きな自治体に寄付すると返礼品がもらえて、翌年の税金から寄付額−2,000円が控除される制度だよ🎁 実質2,000円で豪華な特産品がもらえちゃう✨" },
  { kw: ["ワンストップ", "特例"],
    reply: "ワンストップ特例は、会社員が確定申告なしでふるさと納税の控除を受けられる便利な制度だよ🌱 でも副業で確定申告が必要な人は使えなくて、確定申告で寄付分も一緒に申告することになるよ！" },

  // General topic fallbacks
  { kw: ["NISA", "ニーサ"],
    reply: "NISAは投資の利益に税金がかからない特別な口座のことだよ🌱 通常は約20%の税金がかかるけど、NISA口座なら0円！その分だけお金が育ちやすくなるんだ✨「NISA」タブで詳しく見てね！" },
  { kw: ["確定申告"],
    reply: "確定申告は1年間の所得を計算して税務署に報告する手続きだよ📋 会社員でも副業の純利益が20万円超なら必要！「確定申告」タブのチェッカーで自分に必要か即判定できるよ🌱" },
  { kw: ["副業"],
    reply: "副業は本業以外の収入源を作ることだよ💼 月3万円の追加収入があるだけで生活がぐっと楽になるんだ。「副業」タブの3問診断で自分に合うのが見つかるよ🌱" },
  { kw: ["税金", "ぜいきん"],
    reply: "税金は所得税・住民税が主な種類だよ📋 副業をしてる人は要注意！「確定申告」タブで自分の追加税額をシミュレーションできるから試してみてね🌱" },
  { kw: ["投資", "資産運用"],
    reply: "投資の基本は「長期・積立・分散」だよ🌱 NISA口座でインデックスファンドを毎月コツコツ積み立てるのが、初心者に最もおすすめの方法！「NISA」タブで詳しく見られるよ💰" },
];

function findReply(input) {
  const text = input.toLowerCase();
  for (const item of FAQ) {
    if (item.kw.some(k => text.includes(k.toLowerCase()))) {
      return item.reply;
    }
  }
  return "ごめんね、ボクが答えられるのは副業・確定申告・NISAのことだよ🌱 「副業の始め方」「NISAって何？」「確定申告は必要？」みたいに聞いてもらえると嬉しいな💡";
}

function fmt(n) { return Math.round(n).toLocaleString("ja-JP"); }
function calcTax(income) {
  for (const [limit, rate, ded] of TAX_BRACKETS) {
    if (income <= limit) return Math.floor(income * rate - ded);
  }
}

// ─── ILLUSTRATIONS ────────────────────────────────────
const I = {
  peach: "#F8B6C5", peachDark: "#E8859D",
  sage: "#B5D5A5", sageDark: "#7FB870",
  blue: "#B5D2E8", blueDark: "#7FA8D2",
  cream: "#FDF1D6", tan: "#F0CC8A", brown: "#5A4A3D", paper: "#FFFCF5",
  yellow: "#FCE391", yellowDark: "#E8B547",
};

const Illustration = ({ name, size = 100 }) => {
  const SVGS = {
    writing: (
      <>
        <rect x="22" y="20" width="48" height="60" rx="3" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <line x1="30" y1="34" x2="62" y2="34" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="30" y1="42" x2="66" y2="42" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="30" y1="50" x2="58" y2="50" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="30" y1="58" x2="62" y2="58" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="30" y1="66" x2="50" y2="66" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M72 16 L88 32 L82 38 L66 22 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <line x1="70" y1="22" x2="84" y2="36" stroke={I.brown} strokeWidth="1.5"/>
      </>
    ),
    delivery: (
      <>
        <rect x="10" y="38" width="24" height="24" rx="3" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <line x1="10" y1="50" x2="34" y2="50" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="22" y1="40" x2="22" y2="60" stroke={I.brown} strokeWidth="1.5"/>
        <path d="M34 60 L60 60 L66 50 L56 50 L54 42" fill={I.sage} stroke={I.brown} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        <line x1="50" y1="42" x2="60" y2="42" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="28" cy="70" r="9" fill={I.brown}/>
        <circle cx="28" cy="70" r="3.5" fill={I.cream}/>
        <circle cx="62" cy="70" r="9" fill={I.brown}/>
        <circle cx="62" cy="70" r="3.5" fill={I.cream}/>
      </>
    ),
    programming: (
      <>
        <rect x="15" y="22" width="70" height="56" rx="5" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <path d="M15 28 L15 27 A5 5 0 0 1 20 22 L80 22 A5 5 0 0 1 85 27 L85 32 L15 32 Z" fill={I.sage}/>
        <line x1="15" y1="32" x2="85" y2="32" stroke={I.brown} strokeWidth="2"/>
        <circle cx="22" cy="27" r="1.6" fill={I.peachDark}/>
        <circle cx="28" cy="27" r="1.6" fill={I.tan}/>
        <circle cx="34" cy="27" r="1.6" fill={I.sageDark}/>
        <path d="M36 46 L28 56 L36 66" fill="none" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64 46 L72 56 L64 66" fill="none" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="56" y1="44" x2="44" y2="68" stroke={I.blueDark} strokeWidth="3" strokeLinecap="round"/>
      </>
    ),
    design: (
      <>
        <ellipse cx="46" cy="52" rx="30" ry="26" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <ellipse cx="70" cy="38" rx="8" ry="5" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <circle cx="32" cy="44" r="4.5" fill={I.peachDark}/>
        <circle cx="46" cy="34" r="4.5" fill={I.sageDark}/>
        <circle cx="58" cy="48" r="4.5" fill={I.blueDark}/>
        <circle cx="38" cy="60" r="4.5" fill={I.tan}/>
        <rect x="65" y="56" width="7" height="22" rx="2" transform="rotate(40 68 67)" fill={I.tan} stroke={I.brown} strokeWidth="2"/>
        <path d="M76 52 L84 60 L78 66 L70 58 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
      </>
    ),
    youtube: (
      <>
        <rect x="15" y="25" width="70" height="50" rx="10" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <path d="M42 38 L62 50 L42 62 Z" fill={I.paper} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="2" fill={I.sageDark}/>
        <circle cx="82" cy="80" r="2" fill={I.tan}/>
        <path d="M14 80 L18 84 M18 80 L14 84" stroke={I.blueDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
    teaching: (
      <>
        <rect x="18" y="64" width="64" height="14" rx="2" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <line x1="22" y1="71" x2="78" y2="71" stroke={I.brown} strokeWidth="1.5"/>
        <rect x="22" y="50" width="56" height="14" rx="2" fill={I.sage} stroke={I.brown} strokeWidth="2"/>
        <line x1="26" y1="57" x2="74" y2="57" stroke={I.brown} strokeWidth="1.5"/>
        <rect x="20" y="36" width="60" height="14" rx="2" fill={I.blue} stroke={I.brown} strokeWidth="2"/>
        <line x1="24" y1="43" x2="76" y2="43" stroke={I.brown} strokeWidth="1.5"/>
        <circle cx="50" cy="24" r="8" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <path d="M50 16 L50 12" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
        <path d="M53 14 Q58 11 59 16" fill={I.sageDark} stroke={I.brown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    mercari: (
      <>
        <rect x="20" y="38" width="60" height="42" rx="3" fill={I.tan} stroke={I.brown} strokeWidth="2"/>
        <rect x="46" y="38" width="8" height="42" fill={I.peachDark}/>
        <rect x="20" y="54" width="60" height="8" fill={I.peachDark}/>
        <line x1="20" y1="54" x2="80" y2="54" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="20" y1="62" x2="80" y2="62" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="46" y1="38" x2="46" y2="80" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="54" y1="38" x2="54" y2="80" stroke={I.brown} strokeWidth="1.5"/>
        <path d="M50 38 Q42 28 36 34 Q42 40 50 38 Q58 40 64 34 Q58 28 50 38" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="50" cy="37" r="3" fill={I.brown}/>
      </>
    ),
    data: (
      <>
        <rect x="15" y="20" width="70" height="60" rx="3" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <rect x="15" y="20" width="70" height="11" fill={I.sage}/>
        <line x1="15" y1="31" x2="85" y2="31" stroke={I.brown} strokeWidth="2"/>
        <line x1="38" y1="20" x2="38" y2="80" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="62" y1="20" x2="62" y2="80" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="15" y1="44" x2="85" y2="44" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="15" y1="56" x2="85" y2="56" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="15" y1="68" x2="85" y2="68" stroke={I.brown} strokeWidth="1.5"/>
        <circle cx="26" cy="38" r="2" fill={I.peachDark}/>
        <circle cx="50" cy="38" r="2" fill={I.tan}/>
        <circle cx="73" cy="38" r="2" fill={I.peachDark}/>
        <circle cx="26" cy="50" r="2" fill={I.tan}/>
        <circle cx="50" cy="50" r="2" fill={I.peachDark}/>
        <circle cx="73" cy="50" r="2" fill={I.tan}/>
        <circle cx="26" cy="62" r="2" fill={I.peachDark}/>
        <circle cx="50" cy="62" r="2" fill={I.peachDark}/>
        <circle cx="73" cy="62" r="2" fill={I.tan}/>
        <circle cx="26" cy="74" r="2" fill={I.tan}/>
        <circle cx="50" cy="74" r="2" fill={I.peachDark}/>
        <circle cx="73" cy="74" r="2" fill={I.tan}/>
      </>
    ),
    register: (
      <>
        <rect x="22" y="20" width="48" height="60" rx="3" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <rect x="28" y="28" width="22" height="3" rx="1" fill={I.peachDark}/>
        <line x1="28" y1="40" x2="62" y2="40" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="48" x2="58" y2="48" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="28" y="56" width="20" height="12" rx="2" fill={I.sage} stroke={I.brown} strokeWidth="1.5"/>
        <path d="M32 62 L36 66 L44 58" stroke={I.brown} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M72 16 L88 32 L82 38 L66 22 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <line x1="70" y1="22" x2="84" y2="36" stroke={I.brown} strokeWidth="1.5"/>
      </>
    ),
    study: (
      <>
        <path d="M14 70 L50 60 L86 70 L86 78 L50 68 L14 78 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 70 L50 60 L86 70" stroke={I.brown} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <line x1="50" y1="60" x2="50" y2="68" stroke={I.brown} strokeWidth="2"/>
        <line x1="22" y1="68" x2="40" y2="64" stroke={I.tan} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="60" y1="64" x2="78" y2="68" stroke={I.tan} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="50" cy="34" r="14" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <line x1="50" y1="16" x2="50" y2="20" stroke={I.peachDark} strokeWidth="2" strokeLinecap="round"/>
        <line x1="65" y1="24" x2="62" y2="27" stroke={I.peachDark} strokeWidth="2" strokeLinecap="round"/>
        <line x1="35" y1="24" x2="38" y2="27" stroke={I.peachDark} strokeWidth="2" strokeLinecap="round"/>
        <line x1="68" y1="34" x2="72" y2="34" stroke={I.peachDark} strokeWidth="2" strokeLinecap="round"/>
        <line x1="32" y1="34" x2="28" y2="34" stroke={I.peachDark} strokeWidth="2" strokeLinecap="round"/>
        <rect x="46" y="44" width="8" height="5" rx="1" fill={I.brown}/>
      </>
    ),
    portfolio: (
      <>
        <path d="M14 32 L30 32 L36 26 L82 26 L82 78 L14 78 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <rect x="20" y="38" width="56" height="36" rx="2" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <line x1="28" y1="46" x2="54" y2="46" stroke={I.tan} strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="54" x2="64" y2="54" stroke={I.tan} strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="62" x2="50" y2="62" stroke={I.tan} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="68" cy="64" r="6" fill={I.sage} stroke={I.brown} strokeWidth="1.5"/>
        <path d="M65 64 L67 66 L71 62" stroke={I.brown} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    search: (
      <>
        <rect x="12" y="20" width="56" height="50" rx="3" fill={I.paper} stroke={I.brown} strokeWidth="2"/>
        <line x1="18" y1="30" x2="42" y2="30" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="40" x2="48" y2="40" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="50" x2="40" y2="50" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="60" x2="46" y2="60" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="64" cy="58" r="16" fill={I.paper} stroke={I.peachDark} strokeWidth="4"/>
        <circle cx="64" cy="58" r="9" fill={I.sage} fillOpacity="0.3"/>
        <line x1="76" y1="70" x2="88" y2="82" stroke={I.peachDark} strokeWidth="5" strokeLinecap="round"/>
      </>
    ),
    earn: (
      <>
        <ellipse cx="32" cy="46" rx="14" ry="9" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <line x1="18" y1="46" x2="18" y2="62" stroke={I.brown} strokeWidth="2"/>
        <line x1="46" y1="46" x2="46" y2="62" stroke={I.brown} strokeWidth="2"/>
        <ellipse cx="32" cy="62" rx="14" ry="9" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <text x="32" y="52" textAnchor="middle" fontSize="10" fill={I.brown} fontWeight="800">¥</text>
        <text x="32" y="68" textAnchor="middle" fontSize="10" fill={I.brown} fontWeight="800">¥</text>
        <ellipse cx="62" cy="62" rx="14" ry="9" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <line x1="48" y1="62" x2="48" y2="78" stroke={I.brown} strokeWidth="2"/>
        <line x1="76" y1="62" x2="76" y2="78" stroke={I.brown} strokeWidth="2"/>
        <ellipse cx="62" cy="78" rx="14" ry="9" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <text x="62" y="68" textAnchor="middle" fontSize="10" fill={I.brown} fontWeight="800">¥</text>
        <text x="62" y="84" textAnchor="middle" fontSize="10" fill={I.brown} fontWeight="800">¥</text>
      </>
    ),
    chat: (
      <>
        <path d="M12 24 Q12 18 18 18 L52 18 Q58 18 58 24 L58 44 Q58 50 52 50 L34 50 L24 58 L26 50 L18 50 Q12 50 12 44 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="26" cy="34" r="2.2" fill={I.paper}/>
        <circle cx="35" cy="34" r="2.2" fill={I.paper}/>
        <circle cx="44" cy="34" r="2.2" fill={I.paper}/>
        <path d="M42 52 Q42 46 48 46 L82 46 Q88 46 88 52 L88 72 Q88 78 82 78 L66 78 L74 86 L60 78 L48 78 Q42 78 42 72 Z" fill={I.sage} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
        <line x1="52" y1="60" x2="78" y2="60" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
        <line x1="52" y1="68" x2="72" y2="68" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
    grow: (
      <>
        <line x1="14" y1="80" x2="86" y2="80" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="22" y="60" width="10" height="20" rx="1" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <rect x="38" y="48" width="10" height="32" rx="1" fill={I.sage} stroke={I.brown} strokeWidth="2"/>
        <rect x="54" y="36" width="10" height="44" rx="1" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <rect x="70" y="22" width="10" height="58" rx="1" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <path d="M16 64 L36 52 L52 40 L72 18" stroke={I.brown} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M66 14 L72 18 L70 26" fill="none" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="72" cy="18" r="3" fill={I.peachDark} stroke={I.brown} strokeWidth="1.5"/>
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{display: "block"}}>
      {SVGS[name]}
    </svg>
  );
};

const HeroIllustration = ({ name, maxWidth = 320 }) => {
  const SVGS = {
    job: (
      <>
        <ellipse cx="120" cy="100" rx="105" ry="70" fill={I.cream} opacity="0.55"/>
        {/* Floating coin */}
        <circle cx="42" cy="40" r="15" fill={I.tan} stroke={I.brown} strokeWidth="2.5"/>
        <text x="42" y="46" textAnchor="middle" fontSize="15" fill={I.brown} fontWeight="700">¥</text>
        {/* Package */}
        <rect x="168" y="28" width="38" height="34" rx="3" fill={I.peachDark} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="168" y="41" width="38" height="7" fill={I.brown}/>
        <rect x="183" y="28" width="8" height="34" fill={I.brown}/>
        {/* Central laptop */}
        <rect x="78" y="78" width="84" height="52" rx="4" fill={I.paper} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="82" y="82" width="76" height="44" rx="2" fill={I.blue}/>
        <line x1="90" y1="92" x2="124" y2="92" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="102" x2="144" y2="102" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="112" x2="134" y2="112" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="120" x2="148" y2="120" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="68" y="130" width="104" height="7" rx="2" fill={I.brown}/>
        {/* Sparkles */}
        <path d="M48 132 L51 138 L57 138 L52 142 L54 148 L48 144 L42 148 L44 142 L39 138 L45 138 Z" fill={I.sageDark}/>
        <path d="M198 92 L200 96 L204 96 L201 99 L202 103 L198 100 L194 103 L195 99 L192 96 L196 96 Z" fill={I.peachDark}/>
      </>
    ),
    tax: (
      <>
        <ellipse cx="120" cy="100" rx="105" ry="70" fill={I.cream} opacity="0.55"/>
        {/* Pen */}
        <path d="M178 38 L202 62 L196 68 L172 44 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="176" y1="46" x2="196" y2="66" stroke={I.brown} strokeWidth="1.5"/>
        {/* Document */}
        <rect x="56" y="46" width="64" height="84" rx="3" fill={I.paper} stroke={I.brown} strokeWidth="2.5"/>
        <line x1="64" y1="58" x2="112" y2="58" stroke={I.tan} strokeWidth="3" strokeLinecap="round"/>
        {/* Checkboxes (3 checked, 2 empty) */}
        <rect x="64" y="72" width="9" height="9" rx="1.5" fill={I.sageDark} stroke={I.brown} strokeWidth="1.5"/>
        <path d="M66 76 L68 78 L72 74" stroke={I.paper} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="79" y1="77" x2="112" y2="77" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="64" y="86" width="9" height="9" rx="1.5" fill={I.sageDark} stroke={I.brown} strokeWidth="1.5"/>
        <path d="M66 90 L68 92 L72 88" stroke={I.paper} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="79" y1="91" x2="108" y2="91" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="64" y="100" width="9" height="9" rx="1.5" fill={I.sageDark} stroke={I.brown} strokeWidth="1.5"/>
        <path d="M66 104 L68 106 L72 102" stroke={I.paper} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="79" y1="105" x2="110" y2="105" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="64" y="114" width="9" height="9" rx="1.5" fill={I.paper} stroke={I.brown} strokeWidth="1.5"/>
        <line x1="79" y1="119" x2="104" y2="119" stroke={I.tan} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Calculator */}
        <rect x="138" y="82" width="54" height="62" rx="4" fill={I.sageDark} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="144" y="88" width="42" height="14" rx="2" fill={I.paper}/>
        <text x="180" y="99" textAnchor="end" fontSize="9" fill={I.brown} fontWeight="600">¥0</text>
        <circle cx="151" cy="114" r="3.2" fill={I.paper}/>
        <circle cx="165" cy="114" r="3.2" fill={I.paper}/>
        <circle cx="179" cy="114" r="3.2" fill={I.paper}/>
        <circle cx="151" cy="125" r="3.2" fill={I.paper}/>
        <circle cx="165" cy="125" r="3.2" fill={I.paper}/>
        <circle cx="179" cy="125" r="3.2" fill={I.peachDark}/>
        <circle cx="151" cy="136" r="3.2" fill={I.paper}/>
        <circle cx="165" cy="136" r="3.2" fill={I.paper}/>
        <circle cx="179" cy="136" r="3.2" fill={I.paper}/>
      </>
    ),
    nisa: (
      <>
        <ellipse cx="120" cy="120" rx="105" ry="50" fill={I.cream} opacity="0.55"/>
        {/* Sun */}
        <circle cx="195" cy="38" r="14" fill={I.peachDark}/>
        <line x1="195" y1="18" x2="195" y2="12" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round"/>
        <line x1="215" y1="38" x2="221" y2="38" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round"/>
        <line x1="175" y1="38" x2="169" y2="38" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round"/>
        <line x1="209" y1="24" x2="214" y2="19" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round"/>
        <line x1="181" y1="24" x2="176" y2="19" stroke={I.peachDark} strokeWidth="3" strokeLinecap="round"/>
        {/* Pot */}
        <path d="M82 130 L158 130 L150 168 L90 168 Z" fill={I.tan} stroke={I.brown} strokeWidth="2.5" strokeLinejoin="round"/>
        <rect x="78" y="124" width="84" height="9" rx="2" fill={I.peachDark} stroke={I.brown} strokeWidth="2.5"/>
        {/* Trunk */}
        <rect x="115" y="80" width="10" height="50" fill={I.brown}/>
        {/* Leaves */}
        <circle cx="98" cy="78" r="20" fill={I.sage} stroke={I.brown} strokeWidth="2.5"/>
        <circle cx="142" cy="78" r="20" fill={I.sage} stroke={I.brown} strokeWidth="2.5"/>
        <circle cx="120" cy="52" r="24" fill={I.sageDark} stroke={I.brown} strokeWidth="2.5"/>
        {/* Coin fruits */}
        <circle cx="104" cy="60" r="7" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <text x="104" y="64" textAnchor="middle" fontSize="8" fill={I.brown} fontWeight="700">¥</text>
        <circle cx="138" cy="64" r="7" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <text x="138" y="68" textAnchor="middle" fontSize="8" fill={I.brown} fontWeight="700">¥</text>
        <circle cx="120" cy="82" r="7" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
        <text x="120" y="86" textAnchor="middle" fontSize="8" fill={I.brown} fontWeight="700">¥</text>
        {/* Growth arrow */}
        <path d="M38 144 L38 76 M28 86 L38 76 L48 86" stroke={I.sageDark} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="148" r="4" fill={I.tan} stroke={I.brown} strokeWidth="1.5"/>
      </>
    ),
    stepStart: (
      <>
        <ellipse cx="120" cy="100" rx="100" ry="65" fill={I.cream} opacity="0.55"/>
        {/* Phone body */}
        <rect x="78" y="22" width="84" height="140" rx="14" fill={I.brown}/>
        <rect x="84" y="32" width="72" height="120" rx="7" fill={I.paper}/>
        {/* Status bar */}
        <rect x="84" y="32" width="72" height="14" fill={I.sage}/>
        <circle cx="120" cy="39" r="2" fill={I.paper}/>
        {/* Headline */}
        <rect x="92" y="54" width="56" height="6" rx="2" fill={I.peachDark}/>
        {/* Form fields */}
        <rect x="92" y="68" width="56" height="11" rx="3" fill={I.cream} stroke={I.brown} strokeWidth="1"/>
        <rect x="92" y="84" width="56" height="11" rx="3" fill={I.cream} stroke={I.brown} strokeWidth="1"/>
        <rect x="92" y="100" width="56" height="11" rx="3" fill={I.cream} stroke={I.brown} strokeWidth="1"/>
        {/* Submit button */}
        <rect x="96" y="120" width="48" height="20" rx="10" fill={I.sageDark}/>
        <text x="120" y="134" textAnchor="middle" fontSize="9" fill={I.paper} fontWeight="700">登録する</text>
        {/* Check decoration */}
        <circle cx="200" cy="50" r="16" fill={I.sageDark} stroke={I.brown} strokeWidth="2.5"/>
        <path d="M193 50 L198 55 L207 45" stroke={I.paper} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Sparkles */}
        <circle cx="32" cy="60" r="4" fill={I.yellowDark}/>
        <path d="M42 130 L44 134 L48 134 L45 137 L46 141 L42 138 L38 141 L39 137 L36 134 L40 134 Z" fill={I.peachDark}/>
        <circle cx="30" cy="100" r="3" fill={I.sage}/>
      </>
    ),
    stepAction: (
      <>
        <ellipse cx="120" cy="110" rx="105" ry="60" fill={I.cream} opacity="0.55"/>
        {/* Desk */}
        <rect x="30" y="138" width="180" height="7" rx="2" fill={I.brown}/>
        {/* Laptop */}
        <rect x="78" y="78" width="84" height="54" rx="4" fill={I.paper} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="82" y="82" width="76" height="46" rx="2" fill={I.sage}/>
        <line x1="90" y1="92" x2="124" y2="92" stroke={I.paper} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="102" x2="148" y2="102" stroke={I.paper} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="112" x2="138" y2="112" stroke={I.paper} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="120" x2="144" y2="120" stroke={I.paper} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="64" y="132" width="112" height="7" rx="2" fill={I.brown}/>
        {/* Coffee mug */}
        <rect x="28" y="98" width="22" height="24" rx="3" fill={I.peachDark} stroke={I.brown} strokeWidth="2.5"/>
        <path d="M50 104 Q58 106 58 114 Q58 122 50 124" fill="none" stroke={I.brown} strokeWidth="2.5"/>
        <ellipse cx="39" cy="98" rx="11" ry="3" fill={I.brown} opacity="0.3"/>
        <path d="M34 88 Q36 84 38 88 M40 88 Q42 84 44 88" stroke={I.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Sticky notes */}
        <rect x="180" y="96" width="26" height="32" fill={I.yellow} stroke={I.brown} strokeWidth="2"/>
        <line x1="184" y1="104" x2="202" y2="104" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="184" y1="110" x2="202" y2="110" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="184" y1="116" x2="198" y2="116" stroke={I.brown} strokeWidth="1.5"/>
        <line x1="184" y1="122" x2="200" y2="122" stroke={I.brown} strokeWidth="1.5"/>
        {/* Focus sparkles */}
        <path d="M44 56 L47 63 L54 63 L48 67 L51 74 L44 70 L37 74 L40 67 L34 63 L41 63 Z" fill={I.sageDark}/>
        <circle cx="204" cy="58" r="4" fill={I.peachDark}/>
        <circle cx="194" cy="44" r="2.5" fill={I.yellowDark}/>
      </>
    ),
    stepGrow: (
      <>
        <ellipse cx="120" cy="110" rx="105" ry="60" fill={I.cream} opacity="0.55"/>
        {/* Ground */}
        <line x1="30" y1="150" x2="210" y2="150" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Growth bars (ascending) */}
        <rect x="48" y="115" width="24" height="35" rx="3" fill={I.sage} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="80" y="92" width="24" height="58" rx="3" fill={I.sageDark} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="112" y="68" width="24" height="82" rx="3" fill={I.peachDark} stroke={I.brown} strokeWidth="2.5"/>
        <rect x="144" y="42" width="24" height="108" rx="3" fill={I.yellowDark} stroke={I.brown} strokeWidth="2.5"/>
        {/* Arrow going up */}
        <path d="M60 100 L130 50 L164 26" stroke={I.brown} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M154 22 L166 24 L162 36" stroke={I.brown} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Coins floating */}
        <circle cx="190" cy="40" r="11" fill={I.yellow} stroke={I.brown} strokeWidth="2.5"/>
        <text x="190" y="44" textAnchor="middle" fontSize="11" fill={I.brown} fontWeight="700">¥</text>
        <circle cx="32" cy="80" r="10" fill={I.yellow} stroke={I.brown} strokeWidth="2.5"/>
        <text x="32" y="84" textAnchor="middle" fontSize="10" fill={I.brown} fontWeight="700">¥</text>
        {/* Star */}
        <path d="M198 72 L201 80 L209 80 L203 85 L206 93 L198 88 L190 93 L193 85 L187 80 L195 80 Z" fill={I.peachDark} stroke={I.brown} strokeWidth="2"/>
      </>
    ),
  };
  return (
    <svg viewBox="0 0 240 180" style={{width: "100%", maxWidth, height: "auto", display: "block"}}>
      {SVGS[name]}
    </svg>
  );
};

// ─── CHARACTER: ナル (Naru) ────────────────────────
const Character = ({ pose = "default", size = 120 }) => {
  const poses = {
    default: { armL: -18, armR: 18, eye: "open", mouth: "smile" },
    wave:    { armL: -18, armR: -75, eye: "happy", mouth: "openSmile" },
    talk:    { armL: -25, armR: -10, eye: "open", mouth: "talking" },
    think:   { armL: -10, armR: -55, eye: "thinking", mouth: "small" },
  };
  const p = poses[pose] || poses.default;
  const h = Math.round(size * 1.18);
  return (
    <svg viewBox="0 0 100 118" width={size} height={h} style={{display: "block"}}>
      {/* Shadow */}
      <ellipse cx="50" cy="110" rx="28" ry="3" fill={I.brown} opacity="0.15"/>
      {/* Sprout stem */}
      <line x1="50" y1="18" x2="50" y2="28" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
      {/* Sprout leaves */}
      <path d="M50 18 Q40 8 33 14 Q37 23 50 22" fill={I.sage} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M50 18 Q60 8 67 14 Q63 23 50 22" fill={I.sageDark} stroke={I.brown} strokeWidth="2" strokeLinejoin="round"/>
      {/* Arms (behind body so they look attached) */}
      <g transform={`rotate(${p.armL} 18 70)`}>
        <ellipse cx="13" cy="70" rx="8" ry="5" fill={T.green} stroke={I.brown} strokeWidth="2"/>
      </g>
      <g transform={`rotate(${p.armR} 82 70)`}>
        <ellipse cx="87" cy="70" rx="8" ry="5" fill={T.green} stroke={I.brown} strokeWidth="2"/>
      </g>
      {/* Body (coin) */}
      <circle cx="50" cy="62" r="33" fill={T.green} stroke={I.brown} strokeWidth="2.5"/>
      <circle cx="50" cy="62" r="27" fill="none" stroke="#C99A2E" strokeWidth="1.5" strokeDasharray="3 3"/>
      {/* Eyes */}
      {p.eye === "happy" ? (
        <>
          <path d="M38 57 Q42 52 46 57" stroke={I.brown} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M54 57 Q58 52 62 57" stroke={I.brown} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </>
      ) : p.eye === "thinking" ? (
        <>
          <ellipse cx="42" cy="58" rx="3" ry="4" fill={I.brown}/>
          <ellipse cx="58" cy="58" rx="3" ry="4" fill={I.brown}/>
          <line x1="36" y1="50" x2="44" y2="52" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
          <line x1="56" y1="52" x2="64" y2="50" stroke={I.brown} strokeWidth="2" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <ellipse cx="42" cy="58" rx="3.5" ry="5" fill={I.brown}/>
          <ellipse cx="58" cy="58" rx="3.5" ry="5" fill={I.brown}/>
          <circle cx="43.5" cy="56" r="1.3" fill="#fff"/>
          <circle cx="59.5" cy="56" r="1.3" fill="#fff"/>
        </>
      )}
      {/* Cheeks */}
      <circle cx="32" cy="66" r="4" fill={I.peach} opacity="0.7"/>
      <circle cx="68" cy="66" r="4" fill={I.peach} opacity="0.7"/>
      {/* Mouth */}
      {p.mouth === "smile" && <path d="M44 70 Q50 76 56 70" stroke={I.brown} strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      {p.mouth === "openSmile" && (
        <path d="M43 69 Q50 78 57 69 Q50 74 43 69 Z" fill={I.brown}/>
      )}
      {p.mouth === "talking" && <ellipse cx="50" cy="72" rx="4" ry="3" fill={I.brown}/>}
      {p.mouth === "small" && <line x1="46" y1="72" x2="54" y2="72" stroke={I.brown} strokeWidth="2.5" strokeLinecap="round"/>}
    </svg>
  );
};
// ─── DESIGN TOKENS ────────────────────────────────────
const T = {
  // Backgrounds (warm cream-tinted)
  white: "#ffffff", soft: "#FFF9F2", mute: "#FCF1E8", ink: "#5A4A3D",
  // Text (warm browns)
  primary: "#5A4A3D", secondary: "#8A7A6C", tertiary: "#B0A091",
  onDark: "#FFF9F2", onDarkSub: "#D9C9B8",
  // Main action: warm light green
  pink: "#8BC470", pinkBg: "#E8F2D9", pinkSoft: "#F2F8E8",
  // Accent: warm yellow
  green: "#EFBE56", greenBg: "#FCEDC9",
  // Warm yellow (deeper)
  yellow: "#E8B547", yellowBg: "#FDF1D6",
  // Soft coral orange
  orange: "#F4A562", orangeBg: "#FCE9D5",
  // Soft red
  red: "#D77575", redBg: "#FBE7E7",
  // Borders (warm)
  border: "#E8D5C4", borderLight: "#F2E5D6",
  // Fonts
  serif: '"M PLUS Rounded 1c", "Quicksand", sans-serif',
  sans: '"Quicksand", "M PLUS Rounded 1c", -apple-system, sans-serif',
  // Aliases kept for backward compat with old code
  blue: "#8BC470", blueBg: "#E8F2D9", // green as primary accent
};

// ─── ICON COMPONENT ─────────────────────────────────
// ナルの世界観に合わせて手描き感のあるオリジナルSVGアイコン
const Icon = ({name, size = 24, color = "currentColor", strokeWidth = 2}) => {
  const c = color;
  const sw = strokeWidth;

  const icons = {
    // ═══ TAB ICONS ═══
    home: (
      <g>
        {/* 屋根のスプラウト（ナルの葉と同じテーマ） */}
        <path d="M12 2C11 2.5 11 3.5 12 4C13 3.5 13 2.5 12 2Z" fill={c} opacity="0.6"/>
        <line x1="12" y1="4" x2="12" y2="6" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"/>
        {/* 屋根 */}
        <path d="M4 12L12 5.5L20 12" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        {/* 家の本体 */}
        <path d="M6 11V20C6 20.5 6.5 21 7 21H10.5V15.5H13.5V21H17C17.5 21 18 20.5 18 20V11"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    ),
    work: (
      <g>
        {/* ハンドル */}
        <path d="M9 6.5V5.5C9 4.7 9.7 4 10.5 4H13.5C14.3 4 15 4.7 15 5.5V6.5"
              stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* バッグ本体 */}
        <rect x="3.5" y="6.5" width="17" height="13" rx="2.5"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        {/* 中央のライン */}
        <path d="M3.5 12H20.5" stroke={c} strokeWidth={sw*0.85} strokeLinecap="round"/>
        {/* 錠 */}
        <rect x="10.5" y="11" width="3" height="2" rx="0.5" fill={c} opacity="0.6"/>
      </g>
    ),
    tax: (
      <g>
        {/* 書類本体 */}
        <path d="M6 3.5H14L18.5 8V19.5C18.5 20.3 17.8 21 17 21H6C5.2 21 4.5 20.3 4.5 19.5V5C4.5 4.2 5.2 3.5 6 3.5Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        {/* 折り目 */}
        <path d="M14 3.5V8H18.5" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* グラフ棒 */}
        <line x1="8" y1="17" x2="8" y2="14" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        <line x1="11.5" y1="17" x2="11.5" y2="12" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        <line x1="15" y1="17" x2="15" y2="15" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
      </g>
    ),
    nisa: (
      <g>
        {/* コイン */}
        <ellipse cx="12" cy="19" rx="6.5" ry="2" fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        {/* 茎 */}
        <line x1="12" y1="17" x2="12" y2="9" stroke={c} strokeWidth={sw*0.85} strokeLinecap="round"/>
        {/* 左の葉 */}
        <path d="M12 13C10.5 13 8.5 11.5 8 9.5C10 9 12 10.5 12 13Z"
              fill={c} fillOpacity="0.35" stroke={c} strokeWidth={sw*0.85} strokeLinejoin="round"/>
        {/* 右の葉 */}
        <path d="M12 10C13.5 10 15.5 8.5 16 6.5C14 6 12 7.5 12 10Z"
              fill={c} fillOpacity="0.35" stroke={c} strokeWidth={sw*0.85} strokeLinejoin="round"/>
      </g>
    ),
    ai: (
      <g>
        {/* 吹き出し */}
        <path d="M3.5 5.5C3.5 4.7 4.2 4 5 4H19C19.8 4 20.5 4.7 20.5 5.5V14C20.5 14.8 19.8 15.5 19 15.5H14L10 20V15.5H5C4.2 15.5 3.5 14.8 3.5 14V5.5Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        {/* きらめき */}
        <path d="M12 7L12.8 9.2L15 10L12.8 10.8L12 13L11.2 10.8L9 10L11.2 9.2L12 7Z"
              fill={c} fillOpacity="0.6" stroke={c} strokeWidth={sw*0.6} strokeLinejoin="round"/>
      </g>
    ),

    // ═══ 準備するもの / GUIDE ICONS ═══
    phone: (
      <g>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.5"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <line x1="9.5" y1="4.5" x2="14.5" y2="4.5" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"/>
        <circle cx="12" cy="18.5" r="1" fill={c}/>
      </g>
    ),
    laptop: (
      <g>
        <rect x="4" y="5" width="16" height="11" rx="1.5"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M2.5 19H21.5" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <path d="M10 19L10.5 17H13.5L14 19" stroke={c} strokeWidth={sw*0.8} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),
    email: (
      <g>
        <rect x="3" y="5.5" width="18" height="13" rx="2"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M4 7L12 13L20 7" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),
    education: (
      <g>
        {/* 帽子 */}
        <path d="M2 9L12 4.5L22 9L12 13.5L2 9Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinejoin="round"/>
        {/* 房 */}
        <path d="M18 10V15" stroke={c} strokeWidth={sw*0.8} strokeLinecap="round"/>
        <circle cx="18" cy="16" r="0.9" fill={c}/>
        {/* 本 */}
        <path d="M6 11V16C6 17 8 18 12 18C16 18 18 17 18 16V11"
              stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),
    bank: (
      <g>
        {/* 屋根 */}
        <path d="M3 9L12 4L21 9" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9H21" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        {/* 柱 */}
        <line x1="6" y1="9" x2="6" y2="18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        <line x1="10" y1="9" x2="10" y2="18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        <line x1="14" y1="9" x2="14" y2="18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        <line x1="18" y1="9" x2="18" y2="18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        {/* 基礎 */}
        <path d="M2.5 18.5H21.5" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <rect x="2" y="18" width="20" height="2.5" rx="0.5" fill={c} fillOpacity="0.15"/>
      </g>
    ),
    id: (
      <g>
        <rect x="3" y="5" width="18" height="14" rx="2"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <circle cx="8.5" cy="11" r="2" fill={c} fillOpacity="0.3" stroke={c} strokeWidth={sw*0.8}/>
        <path d="M5 16.5C5 15 6.5 14 8.5 14C10.5 14 12 15 12 16.5" stroke={c} strokeWidth={sw*0.8} strokeLinecap="round" fill="none"/>
        <line x1="14" y1="10" x2="18" y2="10" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"/>
        <line x1="14" y1="13" x2="18" y2="13" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"/>
      </g>
    ),
    camera: (
      <g>
        <path d="M3 8.5C3 7.7 3.7 7 4.5 7H8L9.5 5H14.5L16 7H19.5C20.3 7 21 7.7 21 8.5V18C21 18.8 20.3 19.5 19.5 19.5H4.5C3.7 19.5 3 18.8 3 18V8.5Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="3.5" fill={c} fillOpacity="0.3" stroke={c} strokeWidth={sw*0.85}/>
        <circle cx="12" cy="13" r="1.5" fill={c}/>
      </g>
    ),
    mic: (
      <g>
        <rect x="9" y="3" width="6" height="12" rx="3"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M5 11V12C5 15.5 8 18 12 18C16 18 19 15.5 19 12V11" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="12" y1="18" x2="12" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="9" y1="21" x2="15" y2="21" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
      </g>
    ),
    art: (
      <g>
        {/* パレット */}
        <path d="M12 3C7 3 3 6.5 3 11C3 14 5 16 8 16C8.5 16 9 15.5 9 15C9 13.5 10 13 11 13H14C16.5 13 18 11 18 8.5C18 5.5 15.5 3 12 3Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        {/* ペイントドット */}
        <circle cx="7" cy="8" r="1" fill={c}/>
        <circle cx="11" cy="6" r="1" fill={c} opacity="0.7"/>
        <circle cx="15" cy="8" r="1" fill={c} opacity="0.5"/>
        <circle cx="14" cy="11" r="1" fill={c} opacity="0.9"/>
      </g>
    ),
    pen: (
      <g>
        {/* ペン */}
        <path d="M14 4L20 10L11 19L4 20L5 13L14 4Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6L18 12" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
      </g>
    ),
    bicycle: (
      <g>
        <circle cx="6" cy="16" r="3.5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <circle cx="18" cy="16" r="3.5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M6 16L10 9L15 9L18 16" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M10 9L13 16L18 16" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="15" cy="6" r="1" fill={c}/>
      </g>
    ),
    bag: (
      <g>
        {/* 配達バッグ */}
        <path d="M5 7V19C5 20 5.7 21 7 21H17C18.3 21 19 20 19 19V7"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4H20L19 7H5L4 4Z"
              fill={c} fillOpacity="0.25" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        {/* ハンドル */}
        <path d="M9 11H15" stroke={c} strokeWidth={sw*0.8} strokeLinecap="round"/>
        <path d="M9 14H15" stroke={c} strokeWidth={sw*0.8} strokeLinecap="round"/>
      </g>
    ),
    package: (
      <g>
        <path d="M4 8L12 4L20 8V17L12 21L4 17V8Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 8L12 12L20 8" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="12" x2="12" y2="21" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        {/* リボン */}
        <line x1="8" y1="6" x2="16" y2="10" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"/>
      </g>
    ),
    time: (
      <g>
        <circle cx="12" cy="12" r="8.5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M12 7V12L15 15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),
    money: (
      <g>
        {/* コイン（ナル風） */}
        <circle cx="12" cy="12" r="8" fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw}/>
        <path d="M9 10C9 8.5 10.5 8 12 8C13.5 8 15 8.5 15 10C15 11 14 11.5 12 12C10 12.5 9 13 9 14C9 15.5 10.5 16 12 16C13.5 16 15 15.5 15 14"
              stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="12" y1="6.5" x2="12" y2="17.5" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
      </g>
    ),
    location: (
      <g>
        <path d="M12 22C12 22 20 15 20 10C20 5.5 16.5 2 12 2C7.5 2 4 5.5 4 10C4 15 12 22 12 22Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3" fill={c} fillOpacity="0.35" stroke={c} strokeWidth={sw*0.9}/>
      </g>
    ),
    family: (
      <g>
        {/* 大人 */}
        <circle cx="8" cy="7" r="2.5" fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw*0.9}/>
        <path d="M4 18C4 15 5.5 13 8 13C10.5 13 12 15 12 18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" fill="none"/>
        {/* 子供 */}
        <circle cx="17" cy="9" r="2" fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw*0.9}/>
        <path d="M13.5 18C13.5 16 15 14 17 14C19 14 20.5 16 20.5 18" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" fill="none"/>
      </g>
    ),
    screen: (
      <g>
        <rect x="3" y="4" width="18" height="12" rx="2"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <line x1="8" y1="20" x2="16" y2="20" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12" y2="20" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
      </g>
    ),
    book: (
      <g>
        <path d="M4 5C4 4 5 3 6 3H11V20H6C5 20 4 19 4 18V5Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 5C20 4 19 3 18 3H13V20H18C19 20 20 19 20 18V5Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    ),
    voice: (
      <g>
        {/* 話す人 */}
        <circle cx="9" cy="8" r="3" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M4 20C4 16 6 14 9 14C12 14 14 16 14 20" stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none"/>
        {/* 音波 */}
        <path d="M17 9C18 10 18 12 17 13" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" fill="none"/>
        <path d="M19 7C21 9 21 13 19 15" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" fill="none"/>
      </g>
    ),
    sprout: (
      <g>
        {/* 芽（ナルと同じ） */}
        <path d="M12 21V10" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <path d="M12 12C10 12 8 10 7.5 7.5C10 7.5 12 9 12 12Z"
              fill={c} fillOpacity="0.35" stroke={c} strokeWidth={sw*0.9} strokeLinejoin="round"/>
        <path d="M12 9C14 9 16 7 16.5 4.5C14 4.5 12 6 12 9Z"
              fill={c} fillOpacity="0.35" stroke={c} strokeWidth={sw*0.9} strokeLinejoin="round"/>
      </g>
    ),
    world: (
      <g>
        <circle cx="12" cy="12" r="8.5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M3.5 12H20.5" stroke={c} strokeWidth={sw*0.85} strokeLinecap="round"/>
        <path d="M12 3.5C14.5 6 15.5 9 15.5 12C15.5 15 14.5 18 12 20.5C9.5 18 8.5 15 8.5 12C8.5 9 9.5 6 12 3.5Z"
              stroke={c} strokeWidth={sw*0.85} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),

    // ═══ TIP/ALERT ICONS ═══
    lightbulb: (
      <g>
        {/* 電球 */}
        <path d="M12 3C8.5 3 6 5.5 6 9C6 11 7 12.5 8 13.5V16C8 16.5 8.5 17 9 17H15C15.5 17 16 16.5 16 16V13.5C17 12.5 18 11 18 9C18 5.5 15.5 3 12 3Z"
              fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="9" y1="19" x2="15" y2="19" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="10" y1="21.5" x2="14" y2="21.5" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
        {/* きらめき */}
        <path d="M12 6V9" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round" opacity="0.7"/>
      </g>
    ),
    alert: (
      <g>
        {/* アラート */}
        <circle cx="12" cy="12" r="9" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <line x1="12" y1="7.5" x2="12" y2="13" stroke={c} strokeWidth={sw*1.1} strokeLinecap="round"/>
        <circle cx="12" cy="16.5" r="1" fill={c}/>
      </g>
    ),
    warning: (
      <g>
        {/* 警告三角 */}
        <path d="M12 3L21 19H3L12 3Z"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="10" x2="12" y2="14" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="12" cy="16.5" r="0.9" fill={c}/>
      </g>
    ),
    tools: (
      <g>
        {/* レンチ */}
        <path d="M14.5 6.5C13.5 5.5 13.5 3.5 15 2.5C16.5 1.5 19 2 20 3.5C21 5 20 7 19 7.5C18 8 16.5 7.5 15.5 6.5L14.5 6.5Z"
              fill={c} fillOpacity="0.2" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 6.5L4 17C3 18 3 20 4 21C5 22 7 22 8 21L18.5 10.5"
              stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    ),
    target: (
      <g>
        <circle cx="12" cy="12" r="8.5" fill={c} fillOpacity="0.1" stroke={c} strokeWidth={sw}/>
        <circle cx="12" cy="12" r="5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw*0.9}/>
        <circle cx="12" cy="12" r="2" fill={c} opacity="0.6"/>
      </g>
    ),
    credit_card: (
      <g>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2"
              fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <line x1="2.5" y1="9.5" x2="21.5" y2="9.5" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="5" y1="14" x2="9" y2="14" stroke={c} strokeWidth={sw*0.9} strokeLinecap="round"/>
      </g>
    ),
    scooter: (
      <g>
        {/* スクーター */}
        <circle cx="6" cy="17" r="3" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <circle cx="18" cy="17" r="3" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M6 17L10 10L15 10L15 5H17" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M15 10L18 17" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
      </g>
    ),
    cart: (
      <g>
        <path d="M3 4H5L7 15H17L19 8H7" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M7 8H19L17 15H7L7 8Z" fill={c} fillOpacity="0.15"/>
        <circle cx="9" cy="19" r="1.5" fill={c} fillOpacity="0.3" stroke={c} strokeWidth={sw*0.9}/>
        <circle cx="15" cy="19" r="1.5" fill={c} fillOpacity="0.3" stroke={c} strokeWidth={sw*0.9}/>
      </g>
    ),
    video: (
      <g>
        {/* ビデオカメラ */}
        <rect x="3" y="7" width="12" height="10" rx="1.5" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M15 10L21 7V17L15 14V10Z" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    ),
    briefcase_mini: (
      <g>
        <rect x="3" y="7" width="18" height="13" rx="2" fill={c} fillOpacity="0.15" stroke={c} strokeWidth={sw}/>
        <path d="M9 7V5.5C9 4.7 9.7 4 10.5 4H13.5C14.3 4 15 4.7 15 5.5V7" stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none"/>
      </g>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: "inline-block", verticalAlign: "middle"}}>
      {icons[name] || null}
    </svg>
  );
};


// ─── APP ────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  // ウィンドウ幅を監視してスマホ/PC判定
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [quizStep, setQuizStep] = useState(0);
  const [quizAns, setQuizAns] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [jobSource, setJobSource] = useState("rec"); // "rec" or "all" - tracks where user came from
  const [showUnder20, setShowUnder20] = useState(false); // 20万円以内ガイドの表示
  const [showGuide, setShowGuide] = useState(null); // null or "crowdworks" - 完全ガイドの表示
  const scrollTargetRef = useRef(null); // null = scroll to top, or "rec"/"all" = scroll to section
  const [sideIncome, setSideIncome] = useState(500000);
  const [expenses, setExpenses] = useState(50000);
  const [mainIncome, setMainIncome] = useState(4000000);
  const [taxView, setTaxView] = useState("check");
  const [nisaTab, setNisaTab] = useState("sim");
  const [monthly, setMonthly] = useState(30000);
  const [returnRate, setReturnRate] = useState(5);
  const [years, setYears] = useState(20);
  const [msgs, setMsgs] = useState([{role:"assistant",content:"こんにちは！ボクは「ナル」、このアプリの案内役だよ🌱 コインから新芽が育つように、キミの「わからない」をちょっとずつ「わかった！」に育てていくお手伝いをするね。副業・確定申告・NISAのことなら何でも聞いてね💰"}]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEnd = useRef(null);

  // Inject Google Fonts
  useEffect(() => {
    const links = [
      "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800&family=Quicksand:wght@400;500;600;700&display=swap"
    ];
    const els = links.map(href => {
      const l = document.createElement("link");
      l.href = href; l.rel = "stylesheet";
      document.head.appendChild(l);
      return l;
    });
    return () => els.forEach(e => document.head.removeChild(e));
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  // Scroll handling on page transitions
  useEffect(() => {
    if (scrollTargetRef.current) {
      const id = scrollTargetRef.current === "all" ? "all-jobs-section" : "recommended-section";
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      scrollTargetRef.current = null;
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [tab, selectedJob, selectedStep, quizResult, taxView, nisaTab, showUnder20, showGuide]);

  function getRecommended() {
    // 目標額のマッチング：低い目標はどの副業でも達成可能、高い目標は高収入の可能性がある副業のみ
    const goalMatch = (jobGoals, userGoal) => {
      if (userGoal === "low") return true; // 1-3万円はどの副業でも稼げる
      if (userGoal === "mid") return jobGoals.includes("mid") || jobGoals.includes("high");
      if (userGoal === "high") return jobGoals.includes("high");
      return false;
    };
    return JOBS.filter(j =>
      j.time_v.includes(quizAns.time) &&
      (j.skill_v.includes(quizAns.skill) || quizAns.skill === "any") &&
      goalMatch(j.goal_v, quizAns.goal)
    ).slice(0,3);
  }

  // Tax calc
  const netIncome = Math.max(0, sideIncome - expenses);
  const needsFiling = netIncome > 200000 || mainIncome > 20000000;
  const incomeTax = netIncome > 0 ? calcTax(mainIncome + netIncome) - calcTax(mainIncome) : 0;
  const residentTax = Math.floor(netIncome * 0.1);
  const totalTax = incomeTax + residentTax;

  // NISA calc
  const nisaData = (() => {
    const r = returnRate / 100 / 12;
    let invested = 0, total = 0;
    const pts = [{ y: 0, inv: 0, total: 0 }];
    for (let m = 1; m <= years * 12; m++) {
      total = (total + monthly) * (1 + r);
      invested += monthly;
      if (m % 12 === 0) pts.push({ y: m/12, inv: invested, total: Math.round(total) });
    }
    return { invested, total: Math.round(total), gain: Math.round(total - invested), pts };
  })();
  const taxSaved = Math.floor(nisaData.gain * 0.20315);

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const q = chatInput.trim();
    setMsgs(p => [...p, {role:"user", content: q}]);
    setChatInput("");
    setChatLoading(true);
    // Simulated thinking delay so character's "think" pose feels natural
    await new Promise(r => setTimeout(r, 700 + Math.random() * 700));
    const reply = findReply(q);
    setMsgs(p => [...p, {role:"assistant", content: reply}]);
    setChatLoading(false);
  }

  // ─── COMPONENTS ─────────────────────────────────────
  const Pill = ({active, onClick, children}) => (
    <button onClick={onClick} style={{
      padding: "10px 22px", borderRadius: 980,
      border: active?`2px solid ${T.pink}`:`2px solid ${T.borderLight}`,
      background: active?T.pink:T.white, color: active?T.white:T.primary,
      fontSize: 13, fontWeight: 700, fontFamily: T.sans, cursor: "pointer",
      transition: "all 0.2s ease", letterSpacing: "0.02em",
    }}>{children}</button>
  );

  const CTA = ({onClick, children, secondary, full}) => (
    <button onClick={onClick} style={{
      padding: "16px 32px", borderRadius: 980,
      background: secondary?"transparent":T.pink,
      color: secondary?T.pink:T.white,
      border: secondary?`2px solid ${T.pink}`:"none",
      fontSize: 15, fontWeight: 700, fontFamily: T.sans, cursor: "pointer",
      letterSpacing: "0.02em", transition: "all 0.2s",
      width: full?"100%":"auto",
      boxShadow: secondary ? "none" : "0 4px 0 0 #6BA053",
    }} onMouseEnter={e => { if (!secondary) { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = "0 2px 0 0 #6BA053"; } }}
       onMouseLeave={e => { if (!secondary) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 0 0 #6BA053"; } }}
    >{children}</button>
  );

  const Card = ({children, style, onClick}) => (
    <div onClick={onClick} style={{
      background: T.white, borderRadius: 32, padding: "32px 28px",
      border: `2px solid ${T.borderLight}`,
      cursor: onClick?"pointer":"default", transition: "all 0.25s ease",
      boxShadow: onClick ? "0 4px 0 0 " + T.borderLight : "none",
      ...style
    }}
    onMouseEnter={onClick ? e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = "0 2px 0 0 " + T.borderLight; } : undefined}
    onMouseLeave={onClick ? e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 0 0 " + T.borderLight; } : undefined}
    >{children}</div>
  );

  const Section = ({children, dark, style}) => (
    <section style={{
      padding: "80px 24px",
      background: dark?T.ink:undefined,
      color: dark?T.onDark:undefined,
      ...style
    }}>
      <div style={{maxWidth: 980, margin: "0 auto"}}>{children}</div>
    </section>
  );

  const Eyebrow = ({children, dark}) => (
    <div style={{
      fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: dark?T.pink:T.pink,
      marginBottom: 16, fontFamily: T.sans,
      display: "inline-flex", alignItems: "center", gap: 8,
    }}>
      <span style={{width: 24, height: 2, background: T.pink, borderRadius: 1}}/>
      {children}
    </div>
  );

  const TABS = [
    {id:"home",l:"Home",icon:"home"},
    {id:"job",l:"副業",icon:"work"},
    {id:"tax",l:"確定申告",icon:"tax"},
    {id:"nisa",l:"NISA",icon:"nisa"},
    {id:"chat",l:"AI",icon:"ai"}
  ];

  // ─── HOME ──────────────────────────────────────────
  const HomeView = () => (
    <div>
      {/* Hero */}
      <section style={{
        padding: "100px 24px 80px",
        background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{position: "absolute", top: 60, left: -40, width: 120, height: 120, borderRadius: "50%", background: T.pinkBg, opacity: 0.6}}/>
        <div style={{position: "absolute", top: 200, right: -30, width: 80, height: 80, borderRadius: "50%", background: T.greenBg, opacity: 0.6}}/>
        <div style={{position: "absolute", bottom: 40, left: 40, width: 60, height: 60, borderRadius: "50%", background: T.yellowBg, opacity: 0.6}}/>
        <div style={{maxWidth: 920, margin: "0 auto", position: "relative"}}>
          <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
            <Character pose="wave" size={140}/>
          </div>
          <div style={{
            display: "inline-block", padding: "8px 18px",
            background: T.white, borderRadius: 980,
            fontSize: 12, fontWeight: 700, color: T.pink,
            letterSpacing: "0.08em", marginBottom: 24, fontFamily: T.sans,
            border: `2px solid ${T.pinkBg}`,
          }}>AI MONEY GUIDE</div>
          <h1 style={{
            fontFamily: T.sans, fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.01em",
            margin: "0 0 24px", color: T.primary,
          }}>
            お金の<br/>
            <span style={{color: T.pink}}>わからない</span>を、
            <br/>ぜんぶ解消。
          </h1>
          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.8,
            color: T.secondary, maxWidth: 580, margin: "0 auto 40px",
            fontFamily: T.sans, fontWeight: 500,
          }}>
            副業の始め方から確定申告、NISAでの資産形成まで。<br/>
            AIアドバイザーが一緒に伴走します。
          </p>
          <div style={{display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap"}}>
            <CTA onClick={()=>setTab("job")}>診断を始める →</CTA>
            <CTA onClick={()=>setTab("chat")} secondary>AIに質問する</CTA>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <Section>
        <div style={{textAlign: "center", marginBottom: 56}}>
          <Eyebrow>Three Topics</Eyebrow>
          <h2 style={{fontFamily: T.sans, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.05, color: T.primary}}>
            3つのテーマを<br/>
            <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>ひとつなぎ</span>に。
          </h2>
        </div>
        <div style={{display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"}}>
          {[
            {id: "job", num: "01", title: "副業を始める", desc: "あなたの時間・スキル・目標に合わせて最適な副業を提案。8種類から選びます。", accent: T.orange, bg: T.orangeBg, ill: "job"},
            {id: "tax", num: "02", title: "確定申告を理解", desc: "申告の要否を自動判定し、税額を即座にシミュレーション。5ステップで手続きも解説。", accent: T.blue, bg: T.blueBg, ill: "tax"},
            {id: "nisa", num: "03", title: "NISAで資産形成", desc: "毎月の積立額と期間から、将来の資産を複利計算。Apple Stocks風グラフで視覚化。", accent: T.green, bg: T.greenBg, ill: "nisa"},
          ].map(p => (
            <Card key={p.id} onClick={()=>setTab(p.id)} style={{background: p.bg, border: "none", padding: "32px 28px"}}>
              <div style={{marginBottom: 16, marginLeft: -8}}>
                <HeroIllustration name={p.ill} maxWidth={180}/>
              </div>
              <div style={{fontFamily: T.sans, color: T.pink, fontSize: 28, color: p.accent, marginBottom: 12}}>{p.num}</div>
              <h3 style={{fontFamily: T.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", color: T.primary}}>{p.title}</h3>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.6, color: T.secondary, margin: "0 0 24px", letterSpacing: "-0.01em"}}>{p.desc}</p>
              <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: p.accent}}>詳しく見る →</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Journey - Soft pink section */}
      <Section style={{background: T.pinkSoft}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr", gap: 48}}>
          <div style={{textAlign: "center"}}>
            <Eyebrow>The Journey</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.01em", margin: 0, lineHeight: 1.3, color: T.primary}}>
              お金が育つ、<br/>
              <span style={{color: T.pink}}>4つの段階。</span>
            </h2>
          </div>
          <div style={{display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"}}>
            {[
              {n: "1", t: "副業で収入UP", d: "自分のスキルや時間に合った副業で、月数万円の追加収入をつくる。", c: T.pink, bg: T.pinkBg},
              {n: "2", t: "確定申告を正しく", d: "副業収入が年20万円超なら確定申告が必須。無申告は追徴課税のリスク。", c: T.orange, bg: T.orangeBg},
              {n: "3", t: "NISAへ回す", d: "副業の余剰資金をNISA口座で非課税運用に回す。", c: T.green, bg: T.greenBg},
              {n: "4", t: "資産が成長", d: "複利の力で、20年後の資産は投資額の2〜3倍に育つ可能性。", c: T.yellow, bg: T.yellowBg},
            ].map((s) => (
              <div key={s.n} style={{
                background: T.white, borderRadius: 28, padding: "32px 24px", textAlign: "center",
                border: `2px solid ${s.bg}`,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", color: s.c,
                  fontFamily: T.sans, fontSize: 24, fontWeight: 800,
                }}>{s.n}</div>
                <h4 style={{fontFamily: T.sans, fontSize: 18, fontWeight: 700, margin: "0 0 8px", color: T.primary}}>{s.t}</h4>
                <p style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.7, color: T.secondary, margin: 0}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* AI invitation */}
      <Section style={{background: T.mute}}>
        <Card style={{padding: "64px 48px", textAlign: "center", background: T.white}}>
          <Eyebrow>AI Advisor</Eyebrow>
          <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", lineHeight: 1.1, color: T.primary}}>
            何を聞いても、<br/>
            <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>答えがある。</span>
          </h2>
          <p style={{fontFamily: T.sans, fontSize: 17, lineHeight: 1.6, color: T.secondary, margin: "0 0 32px", maxWidth: 480, marginLeft: "auto", marginRight: "auto"}}>
            「副業と確定申告って何が関係あるの？」など、気軽に質問できます。
          </p>
          <CTA onClick={()=>setTab("chat")}>AIアドバイザーと話す →</CTA>
        </Card>
      </Section>
    </div>
  );

  // ─── JOB ───────────────────────────────────────────
  const JobView = () => {
    // ガイド用の共通ヘルパー（全ガイドで使い回し）
    const GuideTitle = ({eyebrow, title, num, accent = T.pink}) => (
      <div style={{marginBottom: 24}}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div style={{display: "flex", alignItems: "center", gap: 14}}>
          <div style={{
            minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
          }}>{num}</div>
          <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
        </div>
      </div>
    );
    const GuideTip = ({type = "tip", title, children}) => {
      const styles = {
        tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
        warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
        alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
        naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
      }[type];
      return (
        <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
          <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
            <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
            <div style={{flex: 1, minWidth: 0}}>
              {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
              <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
            </div>
          </div>
        </div>
      );
    };
    const GuideStep = ({num, title, children, accent = T.pink}) => (
      <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
        <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
        <div>
          <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
          <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
        </div>
      </div>
    );
    const GuideShell = ({title, subtitle, quickInfo, url, ctaText, children, finalH2 = "始めてみよう🌱"}) => (
      <div>
        <section style={{padding: "48px 24px 0"}}>
          <div style={{maxWidth: 760, margin: "0 auto"}}>
            <button onClick={()=>setShowGuide(null)} style={{
              fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
              cursor: "pointer", padding: 0, fontWeight: 700,
            }}>← サイト一覧に戻る</button>
          </div>
        </section>
        <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
          <div style={{maxWidth: 760, margin: "0 auto"}}>
            <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
              <Character pose="wave" size={140}/>
            </div>
            <Eyebrow>Complete Guide</Eyebrow>
            <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
              {title}<br/><span style={{color: T.pink}}>完全ガイド</span>
            </h1>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>{subtitle}</p>
          </div>
        </section>
        <Section>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
            {quickInfo.map((q, i) => (
              <Card key={i} style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>{q.icon}</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>{q.label}</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6, whiteSpace: "pre-line"}}>{q.value}</div>
              </Card>
            ))}
          </div>
        </Section>
        {children}
        <Section style={{background: T.pinkSoft}}>
          <Card style={{padding: "40px 32px", textAlign: "center"}}>
            <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
              <Character pose="default" size={100}/>
            </div>
            <Eyebrow>Need Help?</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
              わからないこと、何でも聞いてね
            </h2>
            <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
              つまずいたら、ボクに気軽に相談してね🌱
            </p>
            <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
          </Card>
        </Section>
        <Section>
          <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>{finalH2}</h2>
            <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
              このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
            </p>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 980,
              background: T.pink, color: T.white,
              fontFamily: T.sans, fontSize: 16, fontWeight: 800,
              textDecoration: "none", letterSpacing: "0.02em",
              boxShadow: `0 4px 0 0 #6BA053`,
            }}>
              {ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7"/><path d="M8 7H17V16"/>
              </svg>
            </a>
          </Card>
        </Section>
      </div>
    );
    const GuideFAQ = ({items}) => (
      <Section>
        <GuideTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
        <div style={{display: "grid", gap: 12}}>
          {items.map((f, i) => (
            <Card key={i} style={{padding: "20px 24px"}}>
              <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                <span>Q.</span><span>{f.q}</span>
              </div>
              <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>{f.a}</div>
            </Card>
          ))}
        </div>
      </Section>
    );


    // ラクマ完全ガイド
    if (showGuide === "rakuma") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                ラクマ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                楽天運営のフリマアプリ。<br/>手数料6%でメルカリより安くてお得🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約3分<br/>初出品：約10分</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金（手数料）</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 売上の6%（業界最安級）</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>📱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要な機械</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホがおすすめ<br/>（カメラ付き）</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ（カメラ付き）", desc: "ラクマは公式アプリが基本。商品写真を撮るのでカメラ必須。iPhone・Androidどちらも対応。" },
                { icon: "email", title: "メールアドレス", desc: "Gmail・docomo・auなど、確認メールを受け取れるアドレス。" },
                { icon: "package", title: "売りたい不用品", desc: "服・本・家電・コスメ・おもちゃなど、家にある使わなくなったもの。" },
                { icon: "bank", title: "銀行口座（後でOK）", desc: "売上を現金で受け取る時に必要。楽天銀行だと振込手数料無料。" },
                { icon: "cart", title: "楽天会員アカウント（推奨）", desc: "あれば登録がスムーズ。楽天ポイントも貯まる。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="ラクマアプリをダウンロード" accent={T.green}>
                App Store / Google Playで「ラクマ」と検索。赤いロゴの公式アプリをインストール。
              </SubStep>
              <SubStep num="②" title="アプリを開いて「会員登録」をタップ" accent={T.green}>
                「楽天会員でログイン」「メールで登録」のいずれかを選択。楽天会員ならログインだけで即始められる。
              </SubStep>
              <SubStep num="③" title="プロフィール情報を入力" accent={T.green}>
                ニックネーム（本名でなくてOK）、パスワード、生年月日などを入力。
              </SubStep>
              <SubStep num="④" title="電話番号認証" accent={T.green}>
                SMSで4桁の認証番号が届くので入力。
              </SubStep>
              <SubStep num="⑤" title="招待コード入力（任意）" accent={T.green}>
                友達の招待コードを入れると100ポイントもらえる。
              </SubStep>
              <SubStep num="⑥" title="登録完了" accent={T.green}>
                マイページに遷移したら完了！すぐ出品を始められます。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 出品 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="商品を出品する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリ下中央の「出品」ボタンをタップ" accent={T.green}>
                赤い「出品」アイコンをタップ。
              </SubStep>
              <SubStep num="②" title="商品の写真を撮る（最大10枚）" accent={T.green}>
                正面・横・後ろ・タグ・キズ部分など複数角度で撮影。明るい場所が◎。
              </SubStep>
              <SubStep num="③" title="商品名・カテゴリ・状態を入力" accent={T.green}>
                ブランド名・色・サイズを含めると検索されやすい。
              </SubStep>
              <SubStep num="④" title="商品説明を書く" accent={T.green}>
                サイズ、購入時期、使用回数、傷の有無などを丁寧に。
              </SubStep>
              <SubStep num="⑤" title="配送方法を選ぶ" accent={T.green}>
                「かんたんラクマパック」が便利（匿名配送・追跡あり・補償付き）。
              </SubStep>
              <SubStep num="⑥" title="価格を設定" accent={T.green}>
                メルカリで同じ商品が売れている価格を参考に。手数料6%が引かれます。
              </SubStep>
              <SubStep num="⑦" title="「出品する」をタップ" accent={T.green}>
                出品完了！買い手からの連絡を待ちましょう。
              </SubStep>
            </Card>
            <TipBox type="naru" title="メルカリとの違い">
              ✓ <strong>手数料が安い</strong>（メルカリ10% → ラクマ6%）<br/>
              ✓ <strong>楽天ポイントが貯まる</strong>（売上の一部）<br/>
              ✓ <strong>楽天銀行なら振込手数料無料</strong><br/>
              一方で、利用者数はメルカリの方が多いので、売れるスピードはメルカリが早め。両方併用がおすすめ！
            </TipBox>
          </Section>

          {/* Section 4: 報酬受け取り */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="売上金の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="売上金の使い道は3つ" accent={T.pink}>
                ① ラクマで別の商品を購入（手数料無料）<br/>② 楽天キャッシュとして街中で使う<br/>③ 銀行口座に振込
              </SubStep>
              <SubStep num="②" title="楽天銀行なら振込手数料無料" accent={T.pink}>
                10,000円以上の振込で楽天銀行なら手数料0円。その他の銀行は210円。
              </SubStep>
              <SubStep num="③" title="売上金の有効期限は180日" accent={T.pink}>
                半年以内に使うか振込申請しないと失効。本人確認すると無期限になります。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              自分が使った不用品の売却は非課税（譲渡所得・50万円まで）。ただし転売目的の仕入れ販売は雑所得となり、年間20万円超で確定申告が必要。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "メルカリと併用してもOK？", a: "もちろんOK。むしろ併用推奨。同じ商品を両方に出品しておけば、売れるチャンスが倍に。売れた方を削除すればOK。" },
                { q: "手数料6%は本当？", a: "本当です。メルカリの10%と比べて4%安い。10,000円の商品なら600円vs1,000円で400円の差。" },
                { q: "楽天ポイントは貯まる？", a: "購入時にも売却時にも楽天ポイントが付くシステム。楽天経済圏ユーザーには特にお得。" },
                { q: "売れない時の対処法は？", a: "①写真の撮り直し、②価格を相場より少し下げる、③タイトルにキーワード追加、④商品説明を充実、⑤再出品（削除→出品）。" },
                { q: "本人確認は必要？", a: "必須ではありませんが、本人確認すると売上金の有効期限がなくなり、信頼度もUP。マイナンバーカードや免許証で5分で完了。" },
                { q: "発送方法でおすすめは？", a: "「かんたんラクマパック」が一番安心。匿名配送・追跡・補償付きで、ヤマト便200円〜、日本郵便200円〜。" },
                { q: "メルカリと比べてどっちが早く売れる？", a: "利用者数ではメルカリ。ただし価格次第ではラクマの方が早いことも。両方出品して様子を見るのがベスト。" },
                { q: "スマホだけで完結する？", a: "完結します。出品・販売・発送通知・売上振込まで、すべてアプリで完結可能。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://fril.jp/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                ラクマを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // Yahoo!フリマ完全ガイド
    if (showGuide === "yahoofrima") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                Yahoo!フリマ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                PayPay連携で売上を即使える🌱<br/>手数料5%は業界最安級
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約3分<br/>初出品：約10分</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金（手数料）</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 売上の5%（業界最安）</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>📱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要な機械</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホがおすすめ<br/>+ PayPayアプリ（あると便利）</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ", desc: "Yahoo!フリマアプリをインストール。iPhone・Android対応。" },
                { icon: "id", title: "Yahoo! JAPAN ID", desc: "Yahoo!アカウントが必要。なければ無料で作成可能。" },
                { icon: "credit_card", title: "PayPayアカウント（推奨）", desc: "売上をPayPay残高で即受け取りたい人は登録しておく。" },
                { icon: "package", title: "売りたい不用品", desc: "本・服・家電・小物など、家にある不用品。" },
                { icon: "bank", title: "銀行口座（後でOK）", desc: "現金化したい時に必要。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="Yahoo!フリマアプリをダウンロード" accent={T.green}>
                App Store / Google Playで「Yahoo!フリマ」と検索。
              </SubStep>
              <SubStep num="②" title="Yahoo! JAPAN IDでログイン" accent={T.green}>
                既存のYahoo!アカウントでログイン可能。新規作成も簡単。
              </SubStep>
              <SubStep num="③" title="プロフィール情報を入力" accent={T.green}>
                ニックネーム（本名でなくてOK）、生年月日、性別などを入力。
              </SubStep>
              <SubStep num="④" title="電話番号認証" accent={T.green}>
                SMSで認証番号が届くので入力。
              </SubStep>
              <SubStep num="⑤" title="PayPay連携（任意）" accent={T.green}>
                売上をPayPayで即受け取りたいなら連携を。PayPayアプリと自動連携可能。
              </SubStep>
              <SubStep num="⑥" title="登録完了" accent={T.green}>
                マイページに遷移したら完了。すぐ出品可能。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 出品 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="商品を出品する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリ下中央の「出品」ボタンをタップ" accent={T.green}>
                出品画面が開きます。
              </SubStep>
              <SubStep num="②" title="商品写真を撮る（最大10枚）" accent={T.green}>
                明るい場所で複数角度から撮影。1枚目が一番大事（検索結果に表示される）。
              </SubStep>
              <SubStep num="③" title="カテゴリ・商品状態を選ぶ" accent={T.green}>
                Yahoo!フリマは自動でカテゴリを提案してくれることも。
              </SubStep>
              <SubStep num="④" title="商品名・説明文を入力" accent={T.green}>
                ブランド名・サイズ・色・購入時期を含める。
              </SubStep>
              <SubStep num="⑤" title="配送方法を選ぶ" accent={T.green}>
                「おてがる配送」（匿名配送・追跡あり）が便利。ヤマト便170円〜。
              </SubStep>
              <SubStep num="⑥" title="価格を設定" accent={T.green}>
                Yahoo!フリマで似た商品の価格を調べて参考に。手数料5%が引かれます。
              </SubStep>
              <SubStep num="⑦" title="「出品する」をタップ" accent={T.green}>
                出品完了！
              </SubStep>
            </Card>
            <TipBox type="naru" title="Yahoo!フリマの強み">
              ✓ <strong>手数料が業界最安の5%</strong>（メルカリ10%、ラクマ6%）<br/>
              ✓ <strong>PayPayで即受取可能</strong>（街中ですぐ使える）<br/>
              ✓ <strong>Yahoo!オークションと並行出品OK</strong>（売れる確率UP）<br/>
              ✓ <strong>地域を絞った検索が強力</strong>（手渡し取引も可能）
            </TipBox>
          </Section>

          {/* Section 4: 売上 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="売上金の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="PayPayで即受取（推奨）" accent={T.pink}>
                取引完了後、すぐPayPay残高として受け取れます。コンビニやスーパーでそのまま使えて便利。
              </SubStep>
              <SubStep num="②" title="銀行振込" accent={T.pink}>
                指定口座に振込も可能。手数料100円。
              </SubStep>
              <SubStep num="③" title="売上金の有効期限は180日" accent={T.pink}>
                半年以内に使うか振込しないと失効するので注意。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              不用品売却は基本非課税。転売目的の仕入れ販売は年20万超で確定申告必要。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "メルカリ・ラクマと並行で出品OK？", a: "OK。むしろ推奨。3つのフリマアプリに同じ商品を出すと売れる確率が大幅にUP。" },
                { q: "PayPay連携のメリットは？", a: "売上を現金化せず、そのままPayPayで街中の買い物に使える。手数料0円で即時受取。" },
                { q: "Yahoo!オークションとの違いは？", a: "Yahoo!フリマは固定価格、Yahoo!オクは入札方式。両方で同じ商品を出品することも可能（並行出品）。" },
                { q: "手数料5%は本当？", a: "本当です。業界最安級。ただし配送料は出品者負担が多いので、実質手数料はもう少し高くなることも。" },
                { q: "売れない時の対処法は？", a: "①写真の撮り直し、②価格を相場より下げる、③タイトルにキーワード追加、④商品説明充実、⑤Yahoo!オクと並行出品。" },
                { q: "地域を絞った検索ってどう使う？", a: "自分の地域の出品物を検索したり、近所の人と手渡し取引もできる。送料節約・即受取が可能。" },
                { q: "スマホだけで完結する？", a: "完結します。出品・販売・発送・売上受取まですべてスマホで可能。" },
                { q: "発送方法でおすすめは？", a: "「おてがる配送」が安心。匿名配送・追跡・補償付きで、ヤマト便170円〜。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://paypayfleamarket.yahoo.co.jp/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                Yahoo!フリマを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // シュフティ完全ガイド
    if (showGuide === "shufti") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                シュフティ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                主婦・在宅ワーカー特化のクラウドソーシング🌱<br/>初心者OK案件多数、スキマ時間に稼げる
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約5分<br/>初案件：即日〜数日</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金（手数料）</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 報酬の10%</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>👨‍👩‍👧</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>特徴</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>主婦・在宅向け<br/>子育てしながらOK</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "Gmail・docomo・auなど、確認メールを受け取れるアドレス。" },
                { icon: "phone", title: "スマホかパソコン", desc: "タスク案件はスマホで十分。本格的な案件はPCがおすすめ。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
                { icon: "id", title: "本人確認書類", desc: "運転免許証・マイナンバーカードなど。本人確認すると案件獲得率UP。" },
                { icon: "family", title: "お子さんとの時間調整", desc: "空いた時間に少しずつ取り組める案件が多いので、無理せず始められる。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="シュフティ公式サイトを開く" accent={T.green}>
                app.shufti.jp にアクセス。
              </SubStep>
              <SubStep num="②" title="「無料会員登録」をタップ" accent={T.green}>
                画面のオレンジボタン。
              </SubStep>
              <SubStep num="③" title="メールアドレスを入力" accent={T.green}>
                確認メールを受け取れるアドレス。
              </SubStep>
              <SubStep num="④" title="本登録ページから情報入力" accent={T.green}>
                ニックネーム、パスワード、生年月日、子供の人数（任意）など。
              </SubStep>
              <SubStep num="⑤" title="電話番号認証" accent={T.green}>
                SMS認証番号を入力。
              </SubStep>
              <SubStep num="⑥" title="登録完了" accent={T.green}>
                マイページに遷移したら完了。すぐ案件に応募可能。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 案件の種類 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="案件の種類と探し方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="タスク形式（一番気軽）" accent={T.green}>
                1件10〜500円の単発作業。スキマ時間にコツコツ。すぐお金になる。
              </SubStep>
              <SubStep num="②" title="プロジェクト形式（継続案件）" accent={T.green}>
                定期的なお仕事を依頼者と契約。月1〜5万円の安定収入を狙える。
              </SubStep>
              <SubStep num="③" title="人気のジャンル" accent={T.green}>
                ✓ データ入力<br/>✓ 文字起こし<br/>✓ 簡単なライティング<br/>✓ アンケート回答<br/>✓ 商品レビュー<br/>✓ シール貼り・梱包（在宅軽作業）
              </SubStep>
              <SubStep num="④" title="案件を探す方法" accent={T.green}>
                「お仕事を探す」から、ジャンル・報酬・期日で絞り込み。「初心者歓迎」のタグを目印に。
              </SubStep>
            </Card>
            <TipBox type="naru" title="主婦・在宅向けのうれしい工夫">
              ✓ <strong>子育て中歓迎の案件が多い</strong>：依頼者も理解がある<br/>
              ✓ <strong>1〜2時間でできる案件が中心</strong>：お子さんが寝ている間にも◎<br/>
              ✓ <strong>本人確認の手続きが少なめ</strong>：気軽に始められる<br/>
              ✓ <strong>サポートが手厚い</strong>：質問にも丁寧に対応
            </TipBox>
          </Section>

          {/* Section 4: 応募 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="応募と納品の流れ" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="気になる案件に応募" accent={T.pink}>
                「応募する」ボタンから、簡単なメッセージを添えて送信。
              </SubStep>
              <SubStep num="②" title="採用されたらメッセージで打ち合わせ" accent={T.pink}>
                納期や具体的な作業内容を確認。
              </SubStep>
              <SubStep num="③" title="作業して納品" accent={T.pink}>
                指定形式（Excel・Word・Googleフォームなど）で納品。
              </SubStep>
              <SubStep num="④" title="検収後、報酬確定" accent={T.pink}>
                依頼者の確認後、報酬が発生。
              </SubStep>
            </Card>
          </Section>

          {/* Section 5: 報酬 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 5" num="4" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="システム手数料は10%" accent={T.green}>
                報酬から10%が引かれます。
              </SubStep>
              <SubStep num="②" title="月1回まとめて振込" accent={T.green}>
                月末締めで翌月15日に振込。
              </SubStep>
              <SubStep num="③" title="楽天銀行が振込手数料安い" accent={T.green}>
                楽天銀行：100円 / その他：500円。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              副業の純利益が年20万円超で確定申告必要。シュフティは案件単価が低めなので、20万円以内に収まる人も多い。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "クラウドワークスとの違いは？", a: "シュフティは主婦・在宅特化。子育て中の人にやさしい設計で、サポートも手厚い。案件単価は低めだが、初心者には始めやすい。" },
                { q: "子育てしながら稼げる？", a: "稼げます。1〜2時間でできるタスク案件が中心で、お子さんが寝ている間や保育園の間にできる。" },
                { q: "どのくらい稼げる？", a: "パートタイム的に月1〜3万円程度が現実的。本気で取り組めば月5〜10万円も可能。" },
                { q: "旦那にバレない方法は？", a: "住民税を「自分で納付」にすればOK。シュフティの利用そのものは、書面に残らないので安心。" },
                { q: "スキルがなくても始められる？", a: "始められます。データ入力・アンケート・シール貼りなど、スキル不問の案件が多い。" },
                { q: "スマホだけで完結する？", a: "タスク案件はスマホで十分。プロジェクト案件はPCがあった方が効率的。" },
                { q: "シュフティ独自のメリットは？", a: "①子育て中歓迎の案件、②サポートが親切、③在宅軽作業（シール貼り等）の独自案件あり、④コミュニティが温かい。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://app.shufti.jp/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                シュフティを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // 出前館完全ガイド
    if (showGuide === "demaecan") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                出前館<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                LINEヤフー運営の配達員アプリ🌱<br/>配達単価が固定で報酬が安定
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>審査：3〜5日<br/>初配達まで：1週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>配達バッグ：3,000〜5,000円</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🛵</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要なもの</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホ＋自転車<br/>（または原付・バイク）</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ", desc: "出前館配達員アプリ用。" },
                { icon: "bicycle", title: "配達する乗り物", desc: "自転車・原付・バイク・軽自動車のいずれか。" },
                { icon: "bag", title: "配達バッグ", desc: "Amazonで購入（または公式バッグ）。3,000〜5,000円。" },
                { icon: "id", title: "本人確認書類", desc: "運転免許証・マイナンバーカードなど。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
                { icon: "scooter", title: "原付・バイクの追加書類", desc: "車検証、自賠責保険証。自転車の場合は不要。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="出前館配達員サイトを開く" accent={T.green}>
                service.demae-can.co.jp/gig_personal にアクセス。または「出前館 配達員 登録」で検索。
              </SubStep>
              <SubStep num="②" title="「配達員に応募」をタップ" accent={T.green}>
                応募フォームへ。
              </SubStep>
              <SubStep num="③" title="基本情報を入力" accent={T.green}>
                氏名、メアド、電話番号、配達エリアなど。
              </SubStep>
              <SubStep num="④" title="本人確認書類をアップロード" accent={T.green}>
                スマホで撮影してアップロード。明るい場所で4隅がはっきり写るように。
              </SubStep>
              <SubStep num="⑤" title="銀行口座を登録" accent={T.green}>
                振込先口座の情報を入力。
              </SubStep>
              <SubStep num="⑥" title="審査を待つ" accent={T.green}>
                通常3〜5日で結果がメールで届く。
              </SubStep>
              <SubStep num="⑦" title="アプリをインストール" accent={T.green}>
                審査通過後、「出前館配達員」アプリをダウンロード＆ログイン。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 配達 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="配達の流れ" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリを起動して「出発」" accent={T.green}>
                配達エリアに移動してから「出発」ボタンをタップ。
              </SubStep>
              <SubStep num="②" title="配達依頼が来る" accent={T.green}>
                通知が届く。距離・報酬を確認して受注/拒否を判断。
              </SubStep>
              <SubStep num="③" title="店舗で料理受取" accent={T.green}>
                ナビ通りに店舗へ。「出前館の配達員です」と挨拶し、注文番号を伝える。
              </SubStep>
              <SubStep num="④" title="お客様へ配達" accent={T.green}>
                ナビでお客様の元へ。料理を傾けないよう注意。
              </SubStep>
              <SubStep num="⑤" title="完了" accent={T.green}>
                お客様に渡して「配達完了」をタップ。
              </SubStep>
            </Card>
            <TipBox type="naru" title="出前館の強み">
              ✓ <strong>配達単価が固定</strong>：1件あたり750円〜（エリア・時間で変動）<br/>
              ✓ <strong>ブースト時の上乗せが大きい</strong>：雨の日や繁忙期は1.5〜3倍に<br/>
              ✓ <strong>LINEヤフーグループの安心感</strong><br/>
              ✓ <strong>全国の対応エリアが広い</strong>：地方都市でも稼げる
            </TipBox>
          </Section>

          {/* Section 4: 効率 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="効率よく稼ぐコツ" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="ピークタイムを狙う" accent={T.pink}>
                昼11〜14時、夜18〜21時が一番依頼多め。
              </SubStep>
              <SubStep num="②" title="ブースト時に集中稼働" accent={T.pink}>
                雨の日、寒暖差が大きい日、休日のピーク時は単価2〜3倍に。
              </SubStep>
              <SubStep num="③" title="得意エリアを覚える" accent={T.pink}>
                住宅密集地と飲食店密集地が交わるエリアが黄金。
              </SubStep>
            </Card>
            <TipBox type="tip" title="稼げる目安">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>初心者：</strong>3,000〜6,000円/日</li>
                <li><strong>慣れてきた人：</strong>8,000〜15,000円/日</li>
                <li><strong>ピーク時専業：</strong>20,000円超/日も</li>
              </ul>
            </TipBox>
          </Section>

          {/* Section 5: 報酬 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 5" num="4" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="週払い（毎週月曜〜日曜の集計）" accent={T.green}>
                日曜締めで、翌週の振込日に銀行口座へ。
              </SubStep>
              <SubStep num="②" title="月払いも選択可能" accent={T.green}>
                月末締めで翌月振込。
              </SubStep>
              <SubStep num="③" title="インスタント送金" accent={T.green}>
                即時受取（手数料あり）も利用可能。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              配達員は業務委託（個人事業主）扱い。年20万円超の利益で確定申告必要。配達バッグ・自転車メンテ・通信費の一部を経費にできる。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "Uber Eatsとの違いは？", a: "出前館は配達単価が固定で報酬が安定。Uber Eatsは距離・需要で変動。安定収入を求めるなら出前館、ピークで爆発させるならUber Eatsが向いている。" },
                { q: "自転車だけでも稼げる？", a: "稼げます。むしろ自転車の方が小回りが利き、燃料費もかからない。電動アシスト自転車があれば疲労も少ない。" },
                { q: "Uber Eatsと併用OK？", a: "OK。両方アプリを起動して、報酬が高い方を優先するのが効率的。「マルチアプリ稼働」と呼ばれる戦略。" },
                { q: "ブーストはいつ発生する？", a: "雨・雪の日、土日のピーク時、特定エリア（混雑エリア）で発生。アプリで事前に予告される。" },
                { q: "事故った時はどうなる？", a: "出前館の配達中の事故は補償制度あり。詳細は公式ヘルプを確認。自賠責・任意保険にも加入推奨。" },
                { q: "制服や名札は必要？", a: "エリアによる。出前館の専用バッグはあった方が見栄えがよい。注文者からの信頼度UP。" },
                { q: "審査落ちることはある？", a: "書類に不備があれば再提出を求められる。基本的に書類が揃っていれば通過する。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://service.demae-can.co.jp/gig_personal/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                出前館配達員に登録する
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // Wolt完全ガイド
    if (showGuide === "wolt") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                Wolt<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                フィンランド発の配達アプリ🌱<br/>サポートが手厚く、報酬も高め
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>審査：3〜7日<br/>初配達まで：1週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>配達バッグ：公式が貸与あり</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🛵</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要なもの</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホ＋自転車<br/>（または原付・バイク）</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ", desc: "Wolt配達員アプリ用。最新OS推奨。" },
                { icon: "bicycle", title: "配達する乗り物", desc: "自転車推奨（環境配慮型）。原付・バイクもOK。" },
                { icon: "bag", title: "配達バッグ", desc: "公式バッグの貸与あり（保証金が必要なことも）。" },
                { icon: "id", title: "本人確認書類", desc: "運転免許証・マイナンバーカード・在留カードなど。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
                { icon: "location", title: "対応エリア", desc: "東京、大阪、名古屋、福岡など都市部のみ。地方は未対応。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="Wolt配達員サイトを開く" accent={T.green}>
                wolt.com/ja/jpn/courier にアクセス。
              </SubStep>
              <SubStep num="②" title="「Wolt配達員に登録」をタップ" accent={T.green}>
                応募フォームへ。
              </SubStep>
              <SubStep num="③" title="基本情報を入力" accent={T.green}>
                氏名、メアド、電話番号、配達エリアなど。
              </SubStep>
              <SubStep num="④" title="本人確認書類をアップロード" accent={T.green}>
                スマホで撮影してアップロード。
              </SubStep>
              <SubStep num="⑤" title="面接（オンライン or 対面）" accent={T.green}>
                Wolt特有。スタッフからのオンライン面接や、専用拠点での説明会あり。
              </SubStep>
              <SubStep num="⑥" title="配達バッグを受け取る" accent={T.green}>
                Wolt拠点で受け取り（または郵送）。
              </SubStep>
              <SubStep num="⑦" title="審査完了 → 配達開始" accent={T.green}>
                アプリにログインして稼働開始。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 配達 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="配達の流れ" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリを起動して「オンライン」" accent={T.green}>
                配達エリアでオンライン状態に。
              </SubStep>
              <SubStep num="②" title="配達依頼を受け取る" accent={T.green}>
                Woltはアルゴリズムが効率的なルートを提案。
              </SubStep>
              <SubStep num="③" title="店舗で料理受取" accent={T.green}>
                「Woltです」と挨拶。アプリで受取完了をタップ。
              </SubStep>
              <SubStep num="④" title="お客様へ配達" accent={T.green}>
                ナビ通りに配達。アプリで配達完了をタップ。
              </SubStep>
            </Card>
            <TipBox type="naru" title="Woltの独自の強み">
              ✓ <strong>サポートが手厚い</strong>：チャット・電話で24時間対応<br/>
              ✓ <strong>専用拠点あり</strong>：問題があれば直接相談可能<br/>
              ✓ <strong>報酬が高め</strong>：Uber Eatsより1件あたりが高いことも<br/>
              ✓ <strong>スタッフが配達員思い</strong>：フィンランド企業らしい働きやすさ
            </TipBox>
          </Section>

          {/* Section 4: 報酬 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="報酬の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="週払い" accent={T.pink}>
                月〜日曜の週単位で集計。翌週水曜に振込。
              </SubStep>
              <SubStep num="②" title="チップ制度あり" accent={T.pink}>
                お客様からのチップが報酬にプラス。Uber Eatsより文化として根付いている。
              </SubStep>
              <SubStep num="③" title="ボーナス制度" accent={T.pink}>
                繁忙時間帯のボーナスあり。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              業務委託扱い。年20万円超で確定申告必要。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "Uber Eatsとの違いは？", a: "Woltは①サポートが手厚い、②報酬が高め、③配達員思いな企業文化。一方で対応エリアが限定的。" },
                { q: "対応エリアはどこ？", a: "東京、大阪、名古屋、福岡、広島、札幌、京都など主要都市のみ。地方都市は未対応。" },
                { q: "Uber Eatsと併用OK？", a: "OK。マルチアプリ稼働で効率UP。報酬の高い方を選んで配達。" },
                { q: "配達バッグは買わなくていい？", a: "Woltは公式バッグの貸与制度あり（保証金が必要な場合も）。詳細は応募時に確認を。" },
                { q: "チップは本当にもらえる？", a: "お客様の任意なので保証はないが、丁寧な配達をすると貰えやすい。" },
                { q: "サポートに連絡したい時は？", a: "アプリ内チャット、電話、専用拠点（東京）など複数の連絡手段あり。トラブル時も安心。" },
                { q: "自転車推奨の理由は？", a: "環境配慮型の企業文化。フィンランドでは自転車・徒歩配達が一般的。日本でも同じ姿勢。" },
                { q: "審査は厳しい？", a: "Uber Eatsより少し厳しめ。面接（オンライン）があるので、配達員としてのマナーや意識が大切。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://wolt.com/ja/jpn/courier" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                Wolt配達員に登録する
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // レバテックフリーランス完全ガイド
    if (showGuide === "levtech") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                レバテックフリーランス<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                実務経験者向けの高単価エンジニア案件🌱<br/>月収50〜100万円も視野に
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約10分<br/>案件紹介：1〜2週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ マージンはクライアント側</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎯</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>特徴</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>実務経験必須<br/>専属営業が付く</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "連絡用。" },
                { icon: "phone", title: "スマホかパソコン", desc: "プロフィール作成はPC推奨。" },
                { icon: "briefcase_mini", title: "実務経験（重要）", desc: "エンジニアとして2〜3年以上の経験が目安。未経験者向けではない。" },
                { icon: "pen", title: "職務経歴書", desc: "これまでの経歴を整理した書類。Wordで作成。" },
                { icon: "tools", title: "スキルシート", desc: "使える技術スタックの一覧（言語・フレームワーク・ツール）。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="レバテックフリーランス公式サイトを開く" accent={T.green}>
                freelance.levtech.jp にアクセス。
              </SubStep>
              <SubStep num="②" title="「無料登録」をタップ" accent={T.green}>
                画面右上のオレンジボタン。
              </SubStep>
              <SubStep num="③" title="基本情報を入力" accent={T.green}>
                氏名、メアド、電話番号、希望条件など。
              </SubStep>
              <SubStep num="④" title="担当者から連絡が来る" accent={T.green}>
                通常1〜2日以内に専属の営業担当からメール・電話。
              </SubStep>
              <SubStep num="⑤" title="面談（オンライン or 対面）" accent={T.green}>
                スキル・経験・希望をヒアリング。
              </SubStep>
              <SubStep num="⑥" title="案件紹介" accent={T.green}>
                条件に合う案件を提案してくれる。
              </SubStep>
              <SubStep num="⑦" title="面接（クライアント先）" accent={T.green}>
                気になる案件に応募して面接。
              </SubStep>
              <SubStep num="⑧" title="契約→稼働開始" accent={T.green}>
                条件合意後、契約書を交わして案件スタート。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 案件タイプ */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="案件のタイプ" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="常駐型（フルリモート/オンサイト）" accent={T.green}>
                クライアント企業のチームに参加。週5日稼働。月収60〜100万円が中心。
              </SubStep>
              <SubStep num="②" title="準委任契約（成果報酬ではなく時間ベース）" accent={T.green}>
                時間単位で報酬発生。クライアントの指示に従って働く。
              </SubStep>
              <SubStep num="③" title="リモートワーク可能な案件多数" accent={T.green}>
                自宅から稼働できる案件が増えている。地方在住でも応募可能。
              </SubStep>
            </Card>
            <TipBox type="naru" title="レバテックの強み">
              ✓ <strong>専属の営業担当</strong>：あなた専任で案件を探してくれる<br/>
              ✓ <strong>高単価案件中心</strong>：月収60〜100万円が多数<br/>
              ✓ <strong>大手企業の案件</strong>：DeNA、サイバーエージェント、メルカリなど<br/>
              ✓ <strong>福利厚生</strong>：個人事業主向け税理士・健康診断などのサポート
            </TipBox>
          </Section>

          {/* Section 4: 報酬 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="報酬の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="月単位での請求" accent={T.pink}>
                月末締めで、レバテック経由で翌月末に振込。
              </SubStep>
              <SubStep num="②" title="マージンはクライアント側" accent={T.pink}>
                エンジニア側の手数料はなし。クライアント企業が払う。
              </SubStep>
              <SubStep num="③" title="個人事業主としての対応" accent={T.pink}>
                請求書発行・確定申告は自分で対応。レバテックの税理士サポートあり。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              個人事業主扱いで、年間の所得が48万円超で確定申告必要。経費（PC・書籍・通信費・自宅オフィス代）を計上可能。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "未経験でも登録できる？", a: "原則として2〜3年の実務経験が必要。完全未経験は厳しい。まずクラウドワークスで実績を積んでから移行が現実的。" },
                { q: "どんな言語・技術が需要ある？", a: "Java、Python、TypeScript、React、Vue、AWS、Goなどが特に需要高め。" },
                { q: "リモートワーク案件はある？", a: "多数あり。コロナ禍以降、フルリモート案件が増加。地方在住でも応募可能。" },
                { q: "会社員と並行して副業として使える？", a: "週5日稼働が中心なので、フルタイム会社員には厳しい。土日や夜間のみの副業案件は少ない。" },
                { q: "クラウドワークスとの違いは？", a: "レバテックは①フルタイム前提の高単価案件、②専属営業がいる、③大手企業の案件中心。クラウドワークスは小さな案件・初心者向け。" },
                { q: "マージン率は？", a: "レバテックは公開していないが、業界平均で15〜30%。あなたの月収はクライアント側からの支払いから差し引かれる。" },
                { q: "税金や保険はどうする？", a: "個人事業主として自分で対応。レバテックの福利厚生（税理士サポートなど）を活用。国民健康保険・国民年金に加入。" },
                { q: "案件を切られることはある？", a: "クライアント企業の都合で契約終了することはある。営業担当が次の案件をすぐ紹介してくれるので大きなリスクは小さい。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://freelance.levtech.jp/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                レバテックフリーランスを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // Behance完全ガイド
    if (showGuide === "behance") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                Behance<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                Adobe運営のクリエイター向けポートフォリオSNS🌱<br/>作品公開でスカウト型受注を狙う
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約5分<br/>作品公開：随時</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>完全無料</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🌏</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>特徴</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>海外からの<br/>スカウトも</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "Adobe IDの登録用。Gmailなど。" },
                { icon: "art", title: "Adobe ID（あれば便利）", desc: "Adobe Creative Cloud利用者なら既存IDで即連携可能。" },
                { icon: "laptop", title: "パソコン", desc: "作品アップロードはPC推奨。" },
                { icon: "target", title: "作品データ", desc: "あなたの作品（イラスト・写真・デザイン・3DCGなど）。10〜30作品あると魅力的。" },
                { icon: "pen", title: "作品の説明文", desc: "コンセプト・制作背景・使用ツールなど。英語も併記すると海外からも見られる。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="Behance公式サイトを開く" accent={T.green}>
                behance.net にアクセス。
              </SubStep>
              <SubStep num="②" title="「Sign Up」をクリック" accent={T.green}>
                画面右上の登録ボタン。
              </SubStep>
              <SubStep num="③" title="Adobe IDで登録 or 新規作成" accent={T.green}>
                既存Adobe IDがあればログイン。なければ新規作成。
              </SubStep>
              <SubStep num="④" title="プロフィール情報を入力" accent={T.green}>
                名前、自己紹介、得意分野、住んでいる地域など。
              </SubStep>
              <SubStep num="⑤" title="プロフィール写真と表紙画像を設定" accent={T.green}>
                顔写真でなくてもOK。あなたの代表作などを使うと印象的。
              </SubStep>
              <SubStep num="⑥" title="SNS連携（Twitter、Instagram等）" accent={T.green}>
                作品の認知拡大に有効。
              </SubStep>
              <SubStep num="⑦" title="登録完了" accent={T.green}>
                プロフィール完成、作品アップロード開始！
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 作品公開 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="作品を公開する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="「Create」ボタンから作品アップロード" accent={T.green}>
                画面上部の作成ボタン。
              </SubStep>
              <SubStep num="②" title="画像・動画ファイルをアップロード" accent={T.green}>
                JPG・PNG・GIF・MP4などに対応。1作品で複数画像をスライドショー形式で見せる。
              </SubStep>
              <SubStep num="③" title="作品タイトルと説明を書く" accent={T.green}>
                ✓ 作品タイトル（簡潔に）<br/>✓ コンセプト・背景<br/>✓ 使用ツール<br/>✓ クライアント名（あれば）<br/>✓ 制作期間<br/>※ 英語も併記すると海外からも見られる
              </SubStep>
              <SubStep num="④" title="タグを付ける" accent={T.green}>
                「Illustration」「Web Design」「Photography」など。海外ユーザーにも見られるよう英語タグを必ず付ける。
              </SubStep>
              <SubStep num="⑤" title="公開する" accent={T.green}>
                「Publish」をクリック。世界中から見られる状態に。
              </SubStep>
            </Card>
            <TipBox type="naru" title="Behanceの強み">
              ✓ <strong>Adobe運営の高い信頼性</strong><br/>
              ✓ <strong>世界中のクリエイターと繋がれる</strong><br/>
              ✓ <strong>無料で作品ポートフォリオが作れる</strong><br/>
              ✓ <strong>企業・代理店からスカウトされる可能性</strong><br/>
              ✓ <strong>Adobe製品との連携で作品公開がスムーズ</strong>
            </TipBox>
          </Section>

          {/* Section 4: 仕事獲得 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="仕事を獲得する方法" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="スカウト待ち（受動的）" accent={T.pink}>
                作品を見た企業や個人から連絡が来る。作品の質と量が大事。
              </SubStep>
              <SubStep num="②" title="Adobe Talent" accent={T.pink}>
                Behance内の求人プラットフォーム。世界中の案件が掲載される。
              </SubStep>
              <SubStep num="③" title="プロフィールから外部サイトへ誘導" accent={T.pink}>
                プロフィールに「個人サイトURL」「ココナラURL」「Twitter」を載せて誘導。
              </SubStep>
              <SubStep num="④" title="他のクリエイターとの交流" accent={T.pink}>
                コメント・いいね・フォローでネットワークを広げる。
              </SubStep>
            </Card>
            <TipBox type="tip" title="海外案件を狙うコツ">
              ✓ 説明文は英語も併記<br/>
              ✓ 英語タグを必ず付ける<br/>
              ✓ プロフィールに英語の自己紹介<br/>
              ✓ 海外で人気のジャンル（3DCG、UI/UX、イラストなど）を意識
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "Behanceで直接報酬は発生する？", a: "Behance自体は作品公開の場で、報酬は発生しない。仕事獲得のためのポートフォリオサイトとして活用。" },
                { q: "作品が少なくても始められる？", a: "可能。最初は1〜3作品からでもOK。徐々に増やしていく。" },
                { q: "英語ができなくても使える？", a: "使える。日本語のみでもOK。ただし英語併記すると海外からの可能性が広がる。" },
                { q: "Adobe Creative Cloudは必要？", a: "不要。Adobe製品を使っていなくても、Behanceは無料で利用可能。" },
                { q: "どんなジャンルが人気？", a: "イラスト・グラフィックデザイン・Webデザイン・写真・3DCG・アニメーション・モーショングラフィックスなど多岐。" },
                { q: "作品が盗用されないか心配", a: "Behanceには著作権表示機能あり。ただしWeb上に公開する以上、リスクはゼロではない。透かしを入れる対策も有効。" },
                { q: "ココナラやランサーズと併用OK？", a: "推奨。Behanceで作品を見せ、ココナラ等で受注する流れが理想。" },
                { q: "企業からスカウトされる確率は？", a: "作品の質と量次第。100作品以上ある人気クリエイターはほぼ毎日スカウトが来ることも。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                Behanceを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // YouTube Studio完全ガイド
    if (showGuide === "youtube_studio") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                YouTube Studio<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                Google公式の動画チャンネル運営ツール🌱<br/>収益化を目指してチャンネル開設
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>チャンネル開設：5分<br/>収益化条件達成：1〜2年</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>完全無料</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎬</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要なもの</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>Googleアカウント<br/>スマホ/PC</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "id", title: "Googleアカウント", desc: "Gmailアカウントがあれば即可能。" },
                { icon: "phone", title: "スマホ or PC", desc: "動画撮影・編集にはスマホでも十分。本格的に編集するならPC。" },
                { icon: "lightbulb", title: "動画コンテンツのアイデア", desc: "何のチャンネルにするか決める。趣味・スキル・知識・体験談など。" },
                { icon: "mic", title: "録音環境", desc: "スマホのマイクで十分から始められる。慣れたら外付けマイク（数千円）。" },
                { icon: "video", title: "動画編集アプリ", desc: "CapCut（スマホ無料）、DaVinci Resolve（PC無料）が人気。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="studio.youtube.com にアクセス" accent={T.green}>
                またはYouTubeアプリ右上のアイコンから。
              </SubStep>
              <SubStep num="②" title="Googleアカウントでログイン" accent={T.green}>
                既存のGmailアカウントを使用。
              </SubStep>
              <SubStep num="③" title="「チャンネル開設」をクリック" accent={T.green}>
                名前と説明を入力。
              </SubStep>
              <SubStep num="④" title="チャンネルアイコンと背景画像を設定" accent={T.green}>
                Canvaなどで作ると簡単。
              </SubStep>
              <SubStep num="⑤" title="「チャンネル情報」を充実" accent={T.green}>
                自己紹介、SNSリンク、連絡先メールなど。
              </SubStep>
              <SubStep num="⑥" title="電話番号認証" accent={T.green}>
                スマホで認証すると、長い動画のアップロードや収益化申請が可能に。
              </SubStep>
              <SubStep num="⑦" title="設定完了" accent={T.green}>
                アップロードを開始できる状態に。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 動画投稿 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="動画を投稿する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="撮影" accent={T.green}>
                スマホでもOK。明るい場所で、音声がしっかり録れる環境で。
              </SubStep>
              <SubStep num="②" title="編集" accent={T.green}>
                CapCut（スマホ）またはDaVinci Resolve（PC）で編集。テロップ・効果音・BGMで離脱率を下げる。
              </SubStep>
              <SubStep num="③" title="サムネイル作成" accent={T.green}>
                Canvaで作る。視聴回数の80%はサムネとタイトルで決まる。
              </SubStep>
              <SubStep num="④" title="YouTube Studioでアップロード" accent={T.green}>
                ファイル選択→タイトル・説明・タグ→公開設定。
              </SubStep>
              <SubStep num="⑤" title="公開後の分析" accent={T.green}>
                Studioの「アナリティクス」で視聴回数・視聴時間・離脱率を確認。
              </SubStep>
            </Card>
            <TipBox type="naru" title="チャンネル成功のコツ">
              ✓ <strong>ジャンルを絞る</strong>：「料理」より「30分以内で作れる節約料理」のように<br/>
              ✓ <strong>週1〜2本の継続投稿</strong>：100本続けると軌道に乗る人が多い<br/>
              ✓ <strong>最初の15秒で興味を引く</strong>：離脱率が大きく変わる<br/>
              ✓ <strong>サムネとタイトルが命</strong>：競合チャンネルを研究
            </TipBox>
          </Section>

          {/* Section 4: 収益化 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="収益化の条件と方法" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="チャンネル登録者1,000人" accent={T.pink}>
                収益化の最低条件①。
              </SubStep>
              <SubStep num="②" title="過去12ヶ月の総再生時間4,000時間" accent={T.pink}>
                またはShortsの過去90日間で1,000万回再生。
              </SubStep>
              <SubStep num="③" title="広告に適したコンテンツ" accent={T.pink}>
                規約違反（過度な暴力・差別表現など）がないこと。
              </SubStep>
              <SubStep num="④" title="YouTubeパートナープログラム申請" accent={T.pink}>
                条件達成後、YouTube Studioから申請可能。審査に数週間〜数ヶ月。
              </SubStep>
              <SubStep num="⑤" title="複数の収益化手段" accent={T.pink}>
                ✓ 広告収入<br/>✓ メンバーシップ（月額の支援）<br/>✓ スーパーチャット（投げ銭）<br/>✓ Shorts基金<br/>✓ 企業案件<br/>✓ アフィリエイト
              </SubStep>
            </Card>
            <TipBox type="tip" title="収益化までの目安">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>登録者1,000人</strong>：個人差大きいが、平均1〜2年</li>
                <li><strong>4,000時間再生時間</strong>：1動画10分×6万回視聴で達成</li>
                <li><strong>収益化後の広告単価</strong>：登録者数×0.5〜2円/月が目安</li>
              </ul>
            </TipBox>
            <TipBox type="alert" title="税金のこと">
              YouTube収益は年間の所得が48万円超で確定申告必要（個人事業主扱い）。動画編集ソフト・撮影機材・通信費は経費に。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "どんなジャンルが稼ぎやすい？", a: "ビジネス系・教育系（英語、IT、投資など）は単価高め。エンタメ系は再生数を稼ぎやすい。" },
                { q: "収益化までどのくらいかかる？", a: "個人差大きいが、平均1〜2年。「ニッチで需要がある」ジャンルを見つけられれば6ヶ月で達成も。" },
                { q: "動画編集スキルがないと無理？", a: "最初は不要。CapCutやDaVinci Resolveが無料で簡単。慣れれば1動画3〜5時間で作れる。" },
                { q: "顔出ししないと無理？", a: "不要。ゆっくり実況・解説動画・ゲーム実況・料理動画など、顔なしで成功する人多数。" },
                { q: "登録者数より大事なのは？", a: "視聴時間と継続視聴率。「最後まで見られる動画」を作ると広告収益も上がる。" },
                { q: "Shortsだけでも収益化できる？", a: "可能。過去90日で1,000万回再生で収益化対象。短時間で大量制作するスタイル。" },
                { q: "企業案件はいつから来る？", a: "登録者1万人を超えると、月1〜2件はオファーが来ることも。案件単価は登録者数×0.5〜2円。" },
                { q: "ライバルが多くて無理では？", a: "ニッチを攻めれば成立する。「30代主婦が始める投資」のように、ターゲットを絞ると差別化可能。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://studio.youtube.com/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                YouTube Studioを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // マナリンク完全ガイド
    if (showGuide === "manalink") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                マナリンク<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                プロ家庭教師向けの直接契約サービス🌱<br/>自由な時給設定、手数料が安い
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約30分<br/>初案件：1〜2週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 手数料は時給の20%程度</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎓</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要なもの</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>学歴・指導経験<br/>PC + Webカメラ</div>
              </Card>
            </div>
          </Section>

          {/* Section 1: 準備するもの */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "連絡用。" },
                { icon: "education", title: "学歴・指導経験", desc: "大学名（卒業or在学）、指導科目、指導経験など。" },
                { icon: "pen", title: "資格・実績", desc: "教員免許、TOEIC、英検などの資格があれば有利。" },
                { icon: "laptop", title: "パソコン + Webカメラ", desc: "オンライン授業用。マイク内蔵PCでOK。" },
                { icon: "screen", title: "ZOOMアカウント", desc: "オンライン授業の主要ツール。無料で登録可能。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 2: 登録 */}
          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="マナリンク公式サイトを開く" accent={T.green}>
                manalink.jp にアクセス。
              </SubStep>
              <SubStep num="②" title="「先生登録」をクリック" accent={T.green}>
                画面右上のボタン。
              </SubStep>
              <SubStep num="③" title="基本情報を入力" accent={T.green}>
                氏名、メアド、電話番号、学歴、指導歴など。
              </SubStep>
              <SubStep num="④" title="プロフィール写真を設定" accent={T.green}>
                清潔感のある写真を。スーツでなくてもOK、雰囲気が伝わるものを。
              </SubStep>
              <SubStep num="⑤" title="指導科目・対応学年を選ぶ" accent={T.green}>
                得意な科目と、教えられる学年（小学・中学・高校など）を選択。
              </SubStep>
              <SubStep num="⑥" title="自己紹介文を書く" accent={T.green}>
                指導方針・実績・対応可能曜日などを丁寧に。
              </SubStep>
              <SubStep num="⑦" title="時給を設定" accent={T.green}>
                2,000〜5,000円が目安。難関大対応なら6,000円〜も。
              </SubStep>
              <SubStep num="⑧" title="動画自己紹介を撮影（推奨）" accent={T.green}>
                採用率が大きく上がる。生徒・保護者にあなたの雰囲気を伝える。
              </SubStep>
            </Card>
          </Section>

          {/* Section 3: 仕事獲得 */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="仕事を獲得する流れ" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="保護者からスカウトが来る" accent={T.green}>
                プロフィールを見た保護者から連絡。
              </SubStep>
              <SubStep num="②" title="無料体験授業" accent={T.green}>
                30〜60分の体験授業。ここで採用かを決める。
              </SubStep>
              <SubStep num="③" title="採用 → 契約" accent={T.green}>
                合意後、本契約。曜日・時間・継続期間を決める。
              </SubStep>
              <SubStep num="④" title="オンライン授業を実施" accent={T.green}>
                ZOOMやGoogle Meetで授業。マナリンク専用のホワイトボードあり。
              </SubStep>
              <SubStep num="⑤" title="月末に報告書を提出" accent={T.green}>
                授業内容や生徒の進捗を保護者に報告。
              </SubStep>
            </Card>
            <TipBox type="naru" title="マナリンクの強み">
              ✓ <strong>時給を自分で決められる</strong>（2,000〜10,000円）<br/>
              ✓ <strong>手数料が安め</strong>（業界内でも低水準）<br/>
              ✓ <strong>動画自己紹介でアピール可能</strong><br/>
              ✓ <strong>長期契約が中心</strong>：安定収入になりやすい<br/>
              ✓ <strong>オンライン特化</strong>：全国の生徒に対応
            </TipBox>
          </Section>

          {/* Section 4: 報酬 */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="報酬の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="月末締めで翌月15日振込" accent={T.pink}>
                授業時間×時給で計算。手数料20%程度が引かれる。
              </SubStep>
              <SubStep num="②" title="楽天銀行が振込手数料安い" accent={T.pink}>
                楽天銀行：100円 / その他：500円。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              副業の純利益が年20万円超で確定申告必要。教材費・通信費・PC関連は経費に。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* FAQ */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "他のマッチングサイトとの違いは？", a: "マナリンクは直接契約型（先生主導）で、時給を自分で決められる自由度の高さが特徴。手数料も業界内では低めで、動画自己紹介など他にはない機能が使えます。" },
                { q: "学生でも先生になれる？", a: "マナリンクは「プロ家庭教師」志向で、大学院生・社会人講師が中心です。大学生も応募可能ですが、指導経験や実績があると採用されやすくなります。" },
                { q: "時給はどのくらいが妥当？", a: "小学生：2,000〜3,000円 / 中学生：2,500〜4,000円 / 高校生：3,500〜5,000円 / 難関大対策：5,000〜10,000円。" },
                { q: "動画自己紹介は撮らないとダメ？", a: "必須ではないが、採用率が約3倍に上がる。30秒程度でOK。" },
                { q: "生徒や保護者とのトラブル対応は？", a: "マナリンク事務局のサポートあり。何か問題があれば相談可能。" },
                { q: "オンライン授業のツールは？", a: "ZOOMが主流。マナリンク内のオリジナルホワイトボードもあり。" },
                { q: "週何時間くらい働ける？", a: "副業なら週5〜10時間が現実的。月3〜10万円程度の収入になる。" },
                { q: "スキルアップの研修はある？", a: "オンライン研修・指導法の動画あり。希望者は受講可能。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ナル相談 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* 最終CTA */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://manalink.jp/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                マナリンクに登録する
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }



    // まなぶてらす完全ガイド
    if (showGuide === "manatera") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                まなぶてらす<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                フリーランス講師向けのオンライン家庭教師🌱<br/>収入補助・研修制度が充実したサポート型
              </p>
            </div>
          </section>

          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約20分<br/>エントリー〜採用：1週間程度</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>時給の目安</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>1,200円〜5,000円<br/>※ 月35万円以上の講師も</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💻</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要な機械</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>PC or タブレット<br/>+ ネット環境</div>
              </Card>
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "エントリー時の連絡用。" },
                { icon: "laptop", title: "PC or タブレット + ネット環境", desc: "上り・下りとも1.5Mbps以上あれば快適。" },
                { icon: "education", title: "学歴・指導経験", desc: "大学名（卒業or在学）、指導歴、得意分野など。オフラインの指導経験があればスタート可。" },
                { icon: "mic", title: "マイク・カメラ", desc: "内蔵でOK。より高品質にしたい場合は外付けも。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="まなぶてらす公式サイトを開く" accent={T.green}>
                manatera.com にアクセス。
              </SubStep>
              <SubStep num="②" title="「講師募集」ページから応募" accent={T.green}>
                エントリーフォームに氏名・学歴・指導経験などを入力。
              </SubStep>
              <SubStep num="③" title="1週間以内に面談" accent={T.green}>
                エントリー後、まなぶてらすから連絡が来る。オンラインで面談を行い、指導方針や希望を伝える。
              </SubStep>
              <SubStep num="④" title="採用通知" accent={T.green}>
                面談後、採用が決まると通知が届く。
              </SubStep>
              <SubStep num="⑤" title="研修を受ける" accent={T.green}>
                Google Meetで個別研修。指導のコツやレッスンの流れを学ぶ。
              </SubStep>
              <SubStep num="⑥" title="プロフィール作成" accent={T.green}>
                得意分野・レッスンプラン・時給などを設定。生徒が選びやすい情報を用意する。
              </SubStep>
              <SubStep num="⑦" title="レッスン開始" accent={T.green}>
                生徒から予約が入ったら、いよいよ授業開始！
              </SubStep>
            </Card>
          </Section>

          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="まなぶてらすの特徴と強み" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="収入補助プログラムがある" accent={T.green}>
                急な病気・けが・被災などで一定期間仕事ができなくなった場合、状況に応じて1万円〜8万円が事務局から支給される。フリーランスに嬉しい安心設計。
              </SubStep>
              <SubStep num="②" title="講師同士の助け合いカルチャー" accent={T.green}>
                わからないところを教え合ったり、得意分野を共有したり、勉強会も充実。オンライン講師が初めてでも安心。
              </SubStep>
              <SubStep num="③" title="時給を自分で設定できる" accent={T.green}>
                自分の経験・スキルに応じて時給を設定可能。高評価が集まれば単価アップも自分の判断で。
              </SubStep>
              <SubStep num="④" title="教材・指導内容の自由度が高い" accent={T.green}>
                指定テキストなし。生徒のレベルに合わせて自由にテキストを選べる。「MY講座」として独自レッスンの開講もOK。
              </SubStep>
              <SubStep num="⑤" title="24時間365日レッスン需要あり" accent={T.green}>
                国内約35万人の不登校児童、海外約8万人の子女も生徒対象。平日昼や深夜でもレッスン提供が可能なタイミングがある。
              </SubStep>
            </Card>
            <TipBox type="naru" title="こんな人に向いてます">
              ✓ <strong>フリーランスとして安定した収入を目指したい</strong>：収入補助・継続案件で安心<br/>
              ✓ <strong>自分の指導スタイルを大事にしたい</strong>：MY講座で個性を発揮<br/>
              ✓ <strong>他の講師とつながりたい</strong>：ゆるい横のつながり文化<br/>
              ✓ <strong>スキマ時間を有効活用したい</strong>：週数時間からOK
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="報酬の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="時給1,200円〜5,000円" accent={T.pink}>
                自己設定制。経験・実績・生徒評価に応じて上げていく。
              </SubStep>
              <SubStep num="②" title="月35万円以上稼ぐ講師も" accent={T.pink}>
                フルタイム稼働なら月20〜35万円が現実的。人気講師は35万円超え。
              </SubStep>
              <SubStep num="③" title="月末締めで翌月振込" accent={T.pink}>
                銀行振込。手数料の詳細は登録時に案内される。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              副業の純利益が年20万円超で確定申告必要。教材費・通信費・PC関連は経費に計上可能。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "マナリンクとの違いは？", a: "どちらもフリーランス型ですが、まなぶてらすは①収入補助プログラム、②講師同士の助け合い文化、③海外子女・不登校児童など幅広い生徒層が特徴。マナリンクはよりビジネスライクで、個人ブランディングを重視。" },
                { q: "未経験でも大丈夫？", a: "オフラインでの指導経験があればスタート可能。採用後に研修があるので、オンライン講師が初めてでも安心。" },
                { q: "どのくらい稼げる？", a: "副業なら月3〜10万円、フルタイム稼働で月20〜35万円、人気講師は月35万円超え。" },
                { q: "研修の内容は？", a: "Google Meetで個別研修。オンライン指導のコツ、レッスンの流れ、生徒とのやり取りなど、レッスン開始前にサポート。" },
                { q: "特別な機材は必要？", a: "PC or タブレット、ネット環境、内蔵マイク・カメラでOK。ペンタブ・書画カメラがあると板書がスムーズ。" },
                { q: "生徒とのトラブル対応は？", a: "本部スタッフが親子を継続サポート。困ったときは相談可能。" },
                { q: "扶養の範囲内で働ける？", a: "可能。時給と週の指導時間で調整すれば扶養範囲に収まる。" },
                { q: "独自の教材や講座を開ける？", a: "OK。「MY講座」として独自レッスンを開講したり、自作プリント・教材で指導可能。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://www.manatera.com/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                まなぶてらすを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // 家庭教師のトライ完全ガイド
    if (showGuide === "try_teacher") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                家庭教師のトライ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                業界最大手のトライグループ🌱<br/>案件豊富・研修充実で初心者も安心
              </p>
            </div>
          </section>

          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約10分<br/>講習会〜案件紹介：1〜2週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>時給の目安</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>一般：2,000円〜<br/>プロ認定：4,840〜19,250円</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎓</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>対象</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>学生・社会人・主婦<br/>プロまで幅広く</div>
              </Card>
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "登録時の連絡用。" },
                { icon: "education", title: "学歴・指導経験", desc: "学歴問わず応募可能。人間性・責任意識・教える力を重視。" },
                { icon: "phone", title: "スマホ or PC", desc: "登録・案件確認・オンライン指導に使用。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
                { icon: "voice", title: "面接に対応できる意欲", desc: "登録後に本部との面談があるため、意欲を伝えられる姿勢が大事。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="トライ講師募集サイトを開く" accent={T.green}>
                trygroup.co.jp/invite/ にアクセス。
              </SubStep>
              <SubStep num="②" title="「教師登録」フォームから応募" accent={T.green}>
                氏名・連絡先・学歴・希望条件などを入力。
              </SubStep>
              <SubStep num="③" title="トライから確認メールが届く" accent={T.green}>
                メールに記載のURLから本登録を進める。
              </SubStep>
              <SubStep num="④" title="講習会予約" accent={T.green}>
                本登録後、講習会の日程を予約。オンライン開催が中心。
              </SubStep>
              <SubStep num="⑤" title="講習会に参加" accent={T.green}>
                指導のコツ・研修テスト・トライの指導法などを学ぶ。
              </SubStep>
              <SubStep num="⑥" title="案件検索ページにログイン" accent={T.green}>
                講習会後「TRY-WORKS」というシステムで案件を検索。
              </SubStep>
              <SubStep num="⑦" title="希望の案件に応募" accent={T.green}>
                エリア・時間・科目などで絞り込み、希望の案件を選ぶ。
              </SubStep>
              <SubStep num="⑧" title="面接 → 授業開始" accent={T.green}>
                担当生徒が決まったら教育プランナーとのミーティング後、指導スタート。
              </SubStep>
            </Card>
          </Section>

          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="家庭教師のトライの特徴と強み" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="業界最大手・生徒数全国No.1" accent={T.green}>
                CMでおなじみのブランド力。案件数が業界随一で、希望条件に合う案件を見つけやすい。
              </SubStep>
              <SubStep num="②" title="認定講師制度で報酬アップ" accent={T.green}>
                「学生アドバンス認定」「学生プレミアム認定」「プロ認定」など段階制度あり。指導実績や試験結果で時給が大きく上がる。
              </SubStep>
              <SubStep num="③" title="教育プランナーがサポート" accent={T.green}>
                各生徒に教育プランナーがつき、講師と家庭の間に立ってくれる。トラブル時も安心。
              </SubStep>
              <SubStep num="④" title="研修が手厚い" accent={T.green}>
                指導未経験でも安心の研修制度。指導のコツ・受験情報の提供・スキルアップ研修会など、継続支援が充実。
              </SubStep>
              <SubStep num="⑤" title="働き方の選択肢が豊富" accent={T.green}>
                家庭訪問型・オンライン指導・個別教室・トライ式高等学院・大人の家庭教師など、複数の形態から選べる。
              </SubStep>
            </Card>
            <TipBox type="naru" title="こんな人に向いてます">
              ✓ <strong>初めての家庭教師で不安</strong>：研修・サポート体制がしっかり<br/>
              ✓ <strong>安定して案件が欲しい</strong>：業界最大手で紹介案件が豊富<br/>
              ✓ <strong>実績を積んで高収入を目指したい</strong>：認定制度で年収1,000万円超のプロ講師も<br/>
              ✓ <strong>ブランドの信頼感が欲しい</strong>：CMでおなじみの大手で安心
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="時給アップの認定制度" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="一般学生講師" accent={T.pink}>
                時給2,000円〜（都道府県により異なる）。まずはここからスタート。
              </SubStep>
              <SubStep num="②" title="学生アドバンス認定講師" accent={T.pink}>
                指導経験1年以上＋指定大学在籍＋面接評価が条件。時給が大きくアップ。
              </SubStep>
              <SubStep num="③" title="学生プレミアム認定講師" accent={T.pink}>
                アドバンス認定 + 専用テスト合格が条件。学生でもかなり高時給に。
              </SubStep>
              <SubStep num="④" title="プロ認定教師（社会人向け）" accent={T.pink}>
                時給4,840〜19,250円。1時間×5時間×22日で月収110万円超も可能。年収1,000万円以上のトッププロも多数在籍。
              </SubStep>
            </Card>
          </Section>

          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 5" num="4" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="月払い（銀行振込）" accent={T.green}>
                月末締めで翌月振込が一般的。詳細は登録時に案内される。
              </SubStep>
              <SubStep num="②" title="交通費支給あり" accent={T.green}>
                対面案件は交通費支給（上限あり）。オンライン案件は不要。
              </SubStep>
              <SubStep num="③" title="昇給制度あり" accent={T.green}>
                指導経験や合格実績に応じて昇給。頑張った分だけ報酬に反映される仕組み。
              </SubStep>
            </Card>
            <TipBox type="alert" title="税金のこと">
              副業の純利益が年20万円超で確定申告必要。プロ認定など高時給で稼ぐ場合は特に注意。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "マナリンクやまなぶてらすとの違いは？", a: "トライは派遣型（会社に所属してサポートを受ける）。マナリンク・まなぶてらすはフリーランス型（自分でブランディング）。トライはサポートが手厚く未経験でも始めやすい、フリーランス型は自由度が高い。" },
                { q: "未経験でも大丈夫？", a: "OK。学歴に限らず人間性や責任感を重視する採用方針。研修制度も充実しているので、教師経験ゼロでも始められる。" },
                { q: "副業として社会人でも登録できる？", a: "OK。副業歓迎。夜間や土日など、勤務先の勤務時間外に指導する社会人講師も多数活躍中。" },
                { q: "学歴要件はある？", a: "一般の学生講師は学歴不問。ただし「プレミアム認定」は指定大学在籍が条件、「プロ認定」は指導経験や実績が求められる。" },
                { q: "オンライン指導もできる？", a: "OK。家庭訪問型・オンライン型・個別教室・大人の家庭教師など複数の形態あり。自分のライフスタイルに合わせて選べる。" },
                { q: "週1日からOK？", a: "週1日、1コマだけでもOK。得意な1科目から指導可能。" },
                { q: "プロ認定になるには？", a: "指導経験や合格実績、専用テストの合格が条件。プロ認定になると時給4,840〜19,250円で、年収1,000万円超も見えてくる。" },
                { q: "辞めたいときはすぐ辞められる？", a: "担当生徒との契約期間が終わるまでは責任を持つ必要あり。ただし新規案件を受けなければ自然に活動を減らせる。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://www.trygroup.co.jp/invite/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                トライ講師募集を開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // 家庭教師のファースト完全ガイド
    if (showGuide === "first_teacher") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                家庭教師のファースト<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                平均時給2,421円と業界最高水準🌱<br/>全国対応・週1日〜OKの柔軟な働き方
              </p>
            </div>
          </section>

          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約10分<br/>案件紹介まで：随時</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>時給の目安</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>平均2,421円<br/>未経験でも2,040円以上</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🌏</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>対応エリア</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>全国どこでも対応<br/>1日平均50件以上の案件</div>
              </Card>
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "登録時の連絡用。" },
                { icon: "education", title: "学歴・指導経験", desc: "学生・社会人・主婦・ベテランまで幅広く。ブランクあり・未経験も歓迎。" },
                { icon: "phone", title: "スマホ or PC", desc: "登録・案件確認・オンライン指導に使用。" },
                { icon: "bank", title: "銀行口座", desc: "報酬振込先。" },
                { icon: "location", title: "対応可能エリアの確認", desc: "対面指導なら自宅から通える範囲を明確に。オンラインなら不要。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 2" num="1" title="登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="家庭教師のファースト公式サイトを開く" accent={T.green}>
                kyoushi1.net/to-tutor/ にアクセス。
              </SubStep>
              <SubStep num="②" title="「教師登録フォーム」から応募" accent={T.green}>
                氏名・連絡先・学歴・希望条件などを入力。
              </SubStep>
              <SubStep num="③" title="登録内容の確認 → 面談" accent={T.green}>
                本部からメール・電話で連絡が来る。オンライン or 電話で希望条件を詳しくヒアリング。
              </SubStep>
              <SubStep num="④" title="案件紹介" accent={T.green}>
                希望条件に合う生徒が見つかったら、詳細情報が届く。
              </SubStep>
              <SubStep num="⑤" title="家庭との顔合わせ" accent={T.green}>
                対面 or オンラインで顔合わせ。生徒・保護者との相性を確認。
              </SubStep>
              <SubStep num="⑥" title="契約 → 授業開始" accent={T.green}>
                合意後、正式契約。曜日・時間を決めて指導スタート。
              </SubStep>
            </Card>
          </Section>

          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="家庭教師のファーストの特徴と強み" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="業界最高水準の高時給" accent={T.green}>
                平均時給2,421円（2024年11月時点）。未経験でも2,040円以上と、業界内でトップクラス。
              </SubStep>
              <SubStep num="②" title="全国対応・案件数が豊富" accent={T.green}>
                全国展開しており、1日平均50件以上の家庭教師募集・求人案件がある。地方在住でも安心。
              </SubStep>
              <SubStep num="③" title="多様なジャンルに対応" accent={T.green}>
                勉強の家庭教師はもちろん、スポーツ・音楽・趣味・資格・語学の家庭教師も展開。自分の得意分野を活かせる。
              </SubStep>
              <SubStep num="④" title="サポート体制が充実" accent={T.green}>
                指導開始後も、経験豊富な本部スタッフにいつでも相談可能。通話料無料のフリーダイヤルあり。
              </SubStep>
              <SubStep num="⑤" title="週1日〜OK・柔軟な働き方" accent={T.green}>
                勤務可能な曜日・時間を自分で指定できる。複数案件の受け持ちも可能で、収入調整がしやすい。
              </SubStep>
            </Card>
            <TipBox type="naru" title="こんな人に向いてます">
              ✓ <strong>高時給で効率よく稼ぎたい</strong>：業界最高水準の時給<br/>
              ✓ <strong>ブランクがある</strong>：学生時代の家庭教師経験を活かせる<br/>
              ✓ <strong>得意分野で教えたい</strong>：語学・スポーツ・音楽・資格など幅広く<br/>
              ✓ <strong>地方在住でも案件が欲しい</strong>：全国展開で案件豊富<br/>
              ✓ <strong>元教員のセカンドキャリア</strong>：ベテラン活躍中
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="報酬の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="平均時給2,421円" accent={T.pink}>
                未経験でも2,040円以上。指導経験・資格に応じて上がる。
              </SubStep>
              <SubStep num="②" title="月末締めで翌月振込" accent={T.pink}>
                銀行振込。詳細は登録時に案内される。
              </SubStep>
              <SubStep num="③" title="週1日から働ける" accent={T.pink}>
                副業なら週1〜2日で月2〜4万円、フル稼働で月10〜20万円が目安。
              </SubStep>
            </Card>
            <TipBox type="tip" title="収入の目安">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>副業（週1日・月4回）：</strong>約1〜2万円</li>
                <li><strong>副業（週2〜3日）：</strong>月3〜5万円</li>
                <li><strong>本業として（週4〜5日）：</strong>月15〜25万円</li>
              </ul>
            </TipBox>
            <TipBox type="alert" title="税金のこと">
              副業の純利益が年20万円超で確定申告必要。交通費・教材費は経費に計上可能。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{padding: "10px 18px", borderRadius: 980, background: T.pink, color: T.white, border: "none", fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 0 0 #6BA053`}}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "トライとの違いは？", a: "ファーストは①平均時給が高い（2,421円）、②未経験でも時給2,040円以上、③スポーツ・音楽・資格など多様なジャンル対応。トライはブランド力と認定制度が強み、案件数も業界最大。" },
                { q: "未経験でも大丈夫？", a: "OK。学生・社会人・主婦・ベテランまで幅広く歓迎。ブランクありもOK。研修と本部サポートで安心。" },
                { q: "学生でも登録できる？", a: "可能。大学生の家庭教師も多数活躍中。学校終わりの時間から指導OK。" },
                { q: "勉強以外も教えられる？", a: "スポーツ・音楽・趣味・資格・語学など、得意分野を活かせる。自分の強みで稼げるのがファーストの魅力。" },
                { q: "オンライン指導もできる？", a: "OK。対面が難しい場合はオンライン指導のみもOK。全国どこからでも生徒を担当できる。" },
                { q: "案件はどのくらい紹介される？", a: "1日平均50件以上の募集がある。希望条件に合う案件を随時紹介してもらえる。" },
                { q: "急にお休みしたいときは？", a: "本部スタッフに相談可能。生徒との事前調整をサポートしてくれる。" },
                { q: "時給以外にメリットは？", a: "経験豊富な本部スタッフのサポート、通話料無料の相談ダイヤル、業界最高水準の時給還元など。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中や利用中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a href="https://www.kyoushi1.net/to-tutor/" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", borderRadius: 980,
                background: T.pink, color: T.white,
                fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: `0 4px 0 0 #6BA053`,
              }}>
                家庭教師のファーストを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // ココナラ完全ガイド
    if (showGuide === "coconala") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                ココナラ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                登録から「サービス出品」、購入対応、報酬受け取りまで。<br/>あなたのスキルを「商品」として売れるアプリ🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約5分<br/>サービス出品：30分<br/>初注文まで：1〜2週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金（手数料）</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 売上の22%（税込）</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎨</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>特徴</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スキル販売型<br/>500円〜自由に価格設定</div>
              </Card>
            </div>
          </Section>

          {/* === ココナラの仕組みを理解 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="The Concept" num="!" title="ココナラはこんな仕組み" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.95, color: T.primary, margin: "0 0 18px", fontWeight: 500}}>
                ココナラは他の副業サイトと違って、<strong style={{color: T.pink}}>「あなたが商品（サービス）を出品」する</strong>マーケットだよ🛒
              </p>
              <div style={{background: T.soft, borderRadius: 18, padding: "20px 22px", fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>
                <strong style={{color: T.pink}}>【クラウドワークス・ランサーズ】</strong><br/>
                依頼者が「こんな仕事をやってくれる人募集」と募集 → あなたが応募 → 採用されたら作業<br/><br/>
                <strong style={{color: T.green}}>【ココナラ】</strong><br/>
                あなたが「こんなことできます！1,000円から！」と出品 → 買い手が見つけて購入 → 連絡が来てから作業
              </div>
              <p style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.secondary, margin: "16px 0 0", fontWeight: 500}}>
                つまり、Amazonや楽天で「商品ページを作って待つ」感覚で副業ができるんだよ。営業が苦手な人にも合う仕組み🌱
              </p>
            </Card>
          </Section>

          {/* === Section 1: 準備するもの === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              ココナラは「あなたのスキル」が商品。スキルがなくても、誰でも持っている経験を商品化できます。
            </p>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "Gmailやお使いのメアドでOK。確認メールを受け取れるアドレスを準備。" },
                { icon: "phone", title: "スマホかパソコン", desc: "サービス出品はパソコンの方が編集しやすい。やり取りはスマホだけで完結可能。" },
                { icon: "lightbulb", title: "売れるスキル・経験", desc: "プロ級でなくてOK。「○○の相談に乗ります」「○○の経験を共有します」など、誰かの役に立つ知識・経験ならOK。下にアイデア例あり。" },
                { icon: "bank", title: "銀行口座の情報", desc: "報酬の振込先として後で必要。楽天銀行・ジャパンネット銀行は振込手数料が安くてお得。" },
                { icon: "id", title: "本人確認書類", desc: "免許証・マイナンバーカード・パスポートのいずれか1つ。本人確認すると信頼度が大幅UP。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <TipBox type="naru" title="「売れるスキル」のアイデア例">
              <strong>専門スキルがある人</strong><br/>
              ✓ Webデザイン・ロゴ制作・名刺デザイン<br/>
              ✓ 動画編集・YouTube用サムネ作成<br/>
              ✓ プログラミング相談・Webサイト制作<br/>
              ✓ ライティング・ブログ記事執筆<br/>
              ✓ イラスト・似顔絵<br/><br/>
              <strong>専門スキルがなくても出せる</strong><br/>
              ✓ 占い・スピリチュアル相談<br/>
              ✓ 恋愛相談・人生相談<br/>
              ✓ 子育て経験のシェア<br/>
              ✓ ダイエット・健康相談<br/>
              ✓ 転職・キャリア相談<br/>
              ✓ 翻訳・語学教えます<br/>
              ✓ Excel・PowerPointの使い方指導<br/>
              ✓ 旅行プランの作成<br/><br/>
              つまり、誰かに「教えられる」「相談に乗れる」ことなら、何でも商品化できるんだよ🌱
            </TipBox>
          </Section>

          {/* === Section 2: アカウント登録 === */}
          <Section>
            <SectionTitle eyebrow="Section 2 · 約5分" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="ココナラのサイトを開く" accent={T.green}>
                ブラウザで <strong>coconala.com</strong> にアクセス。または、このガイドの「サイトを開く」ボタンから。
              </SubStep>
              <SubStep num="②" title="「会員登録（無料）」をタップ" accent={T.green}>
                画面の右上に<strong style={{color: T.pink}}>「会員登録」</strong>のオレンジ色のボタンがあります。
              </SubStep>
              <SubStep num="③" title="登録方法を選ぶ" accent={T.green}>
                ✓ メールアドレスで登録（シンプル・推奨）<br/>✓ Googleアカウント<br/>✓ Yahoo! JAPAN ID<br/>✓ Apple ID
              </SubStep>
              <SubStep num="④" title="メールアドレスを入力" accent={T.green}>
                準備しておいたメールアドレスを入力。
              </SubStep>
              <SubStep num="⑤" title="届いたメールのリンクをタップ" accent={T.green}>
                確認メールが届くので、本文中のリンクをタップ。
              </SubStep>
              <SubStep num="⑥" title="基本情報を入力" accent={T.green}>
                ユーザー名（本名でなくてOK）、パスワード、性別、生年月日、出身地などを入力。
              </SubStep>
              <SubStep num="⑦" title="興味のあるカテゴリを選ぶ" accent={T.green}>
                ココナラの「あなたへのおすすめ」を表示するために、興味のあるカテゴリを3〜5個選びます。後から変更可能。
              </SubStep>
              <SubStep num="⑧" title="登録完了！" accent={T.green}>
                マイページに遷移したら登録完了です。
              </SubStep>
            </Card>

            <TipBox type="warning" title="つまずきやすいポイント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>確認メールが届かない時</strong> → 「迷惑メールフォルダ」を確認。「@coconala.com」を受信許可に。</li>
                <li><strong>ユーザー名は後から変えられる</strong>から、深く悩まなくてOK。</li>
                <li><strong>パスワードは必ずメモ</strong>。スマホのメモ帳や紙でも◎。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 3: サービスを出品する === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3 · 約30分" num="2" title="サービスを出品する（一番大事）" accent={T.green}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              ココナラの中心機能。あなたのスキルを「商品」として並べていきます。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="画面上部「出品する」をタップ" accent={T.green}>
                ログイン後、画面右上の<strong>「出品する」</strong>ボタンから。
              </SubStep>
              <SubStep num="②" title="カテゴリを選ぶ" accent={T.green}>
                「Webサイト制作・Webデザイン」「動画編集」「ライティング」「占い」など、自分のスキルに合うカテゴリを選択。
              </SubStep>
              <SubStep num="③" title="サービス内容の入力" accent={T.green}>
                以下の項目を順番に入力していきます：<br/>
                ✓ <strong>サービスタイトル</strong>（最重要！）<br/>
                ✓ サービスの説明文<br/>
                ✓ 価格<br/>
                ✓ お届け日数<br/>
                ✓ 修正回数の上限<br/>
                ✓ サービス画像（〜10枚）
              </SubStep>
              <SubStep num="④" title="サービスタイトルを練る" accent={T.green}>
                タイトルは「<strong>○○します</strong>」で終わる形式。例：「ロゴデザイン作成します」「恋愛相談承ります」<br/>
                <strong>30文字以内</strong>で、検索に引っかかるキーワードを含める。
              </SubStep>
              <SubStep num="⑤" title="サービス説明文を書く" accent={T.green}>
                ✓ あなたの実績・経歴<br/>
                ✓ サービスの内容（具体的に）<br/>
                ✓ 納品物のイメージ<br/>
                ✓ 購入の流れ<br/>
                ✓ 注意事項<br/>
                500〜1,500文字程度が目安。
              </SubStep>
              <SubStep num="⑥" title="サービス画像をアップロード" accent={T.green}>
                <strong>1枚目が一番大事</strong>（検索結果に表示される）。Canvaで作るのが簡単。サンプル作品や、サービス内容を伝える画像を最大10枚まで設定可能。
              </SubStep>
              <SubStep num="⑦" title="「公開申請」をタップ" accent={T.green}>
                ココナラの審査を通過すると公開されます。通常1〜2営業日。
              </SubStep>
            </Card>

            <TipBox type="naru" title="サービスタイトルの例（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <strong>【デザイン系】</strong><br/>
                ✓ シンプルで素敵なロゴデザインを作成します<br/>
                ✓ YouTube用のサムネイル画像を作ります<br/><br/>
                <strong>【ライティング系】</strong><br/>
                ✓ SEOに強い5,000字の記事をライティングします<br/>
                ✓ ブログ記事のリライト＆校正します<br/><br/>
                <strong>【相談系】</strong><br/>
                ✓ 恋愛のお悩みを丁寧に聞いてアドバイスします<br/>
                ✓ 転職活動の進め方を実体験を元にアドバイス<br/><br/>
                <strong>【スキル指導系】</strong><br/>
                ✓ Excel関数の使い方を初心者向けに教えます<br/>
                ✓ ZOOMで英会話の練習相手になります
              </div>
            </TipBox>
          </Section>

          {/* === Section 4: サービス文の書き方 === */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="売れるサービス説明文の書き方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="冒頭で「誰のためのサービス」かを明示" accent={T.pink}>
                「<strong>○○でお悩みの方へ</strong>」と書き出すと、ターゲットに刺さりやすい。例：「ロゴを依頼したいけど、何を頼んでいいかわからない個人事業主の方へ」
              </SubStep>
              <SubStep num="②" title="自己紹介・実績を簡潔に" accent={T.pink}>
                経歴・実績を簡潔に。「○年間の経験」「実績○○件」など数字を入れると説得力UP。
              </SubStep>
              <SubStep num="③" title="サービスの具体的な内容" accent={T.pink}>
                ✓ 何を作るのか・何を提供するのか<br/>
                ✓ 納品物の形式（PDF・Word・画像など）<br/>
                ✓ 含まれる作業の範囲
              </SubStep>
              <SubStep num="④" title="購入後の流れを書く" accent={T.pink}>
                ① 購入<br/>② ヒアリング（こちらから質問させていただきます）<br/>③ 制作<br/>④ 納品<br/>⑤ 修正対応<br/>⑥ 完了
              </SubStep>
              <SubStep num="⑤" title="購入前のお願い・注意事項" accent={T.pink}>
                「<strong>購入前にメッセージで一度ご相談ください</strong>」「修正は3回まで対応」など、トラブル防止のルールを書く。
              </SubStep>
            </Card>

            <TipBox type="tip" title="サービス文章のテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 12, lineHeight: 1.95, color: T.primary}}>
                <p style={{margin: "0 0 8px"}}><strong>＜冒頭＞</strong><br/>
                〇〇でお困りの方へ。<br/>
                〇〇のことなら、△△にお任せください！</p>

                <p style={{margin: "0 0 8px"}}><strong>＜実績＞</strong><br/>
                ・〇年間の実績<br/>
                ・累計〇〇件以上の対応<br/>
                ・〇〇ランキング1位獲得</p>

                <p style={{margin: "0 0 8px"}}><strong>＜提供内容＞</strong><br/>
                ・○○の作成<br/>
                ・△△のデザイン<br/>
                ・□□の修正対応</p>

                <p style={{margin: "0 0 8px"}}><strong>＜納品物＞</strong><br/>
                ・〇〇形式のファイル<br/>
                ・△△データ</p>

                <p style={{margin: "0 0 8px"}}><strong>＜購入の流れ＞</strong><br/>
                ① 購入前にダイレクトメッセージでご相談<br/>
                ② 内容のヒアリング<br/>
                ③ 制作開始（〇日以内に納品）<br/>
                ④ 納品＆修正対応（最大〇回まで）<br/>
                ⑤ 完了</p>

                <p style={{margin: 0}}><strong>＜お願い＞</strong><br/>
                購入前に一度ダイレクトメッセージでお問い合わせいただけると、スムーズに進められます。</p>
              </div>
            </TipBox>
          </Section>

          {/* === Section 5: 価格設定 === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 5" num="4" title="売れる価格の決め方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="同じカテゴリの相場を調べる" accent={T.pink}>
                ココナラで同じカテゴリの上位サービスを5〜10件チェック。<strong>価格と販売実績</strong>を見て相場を把握。
              </SubStep>
              <SubStep num="②" title="初心者は相場より少し安く設定" accent={T.pink}>
                相場が5,000円なら、自分は<strong>3,000〜4,000円</strong>からスタート。10件以上売れて評価が貯まったら、徐々に値上げ。
              </SubStep>
              <SubStep num="③" title="最低価格は500円から" accent={T.pink}>
                ココナラは500円から設定可能。占い・相談系は500〜1,000円、デザイン系は3,000円〜が一般的。
              </SubStep>
              <SubStep num="④" title="手数料（22%）を引いて手取り計算" accent={T.pink}>
                例：5,000円で売る → 手数料1,100円（22%）= <strong>手取り 3,900円</strong>
              </SubStep>
              <SubStep num="⑤" title="複数プランを用意（おすすめ）" accent={T.pink}>
                「基本」「スタンダード」「プレミアム」と段階的に作ると、購入者が選びやすい。例：基本2,000円 / スタンダード5,000円 / プレミアム10,000円
              </SubStep>
            </Card>

            <TipBox type="tip" title="カテゴリ別の価格目安">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.95}}>
                <li><strong>占い・相談</strong>：500〜3,000円（10〜30分）</li>
                <li><strong>イラスト・似顔絵</strong>：1,500〜10,000円</li>
                <li><strong>ロゴデザイン</strong>：5,000〜30,000円</li>
                <li><strong>YouTube サムネ</strong>：1,000〜5,000円</li>
                <li><strong>記事ライティング</strong>：1文字1〜3円（3,000字なら3,000〜9,000円）</li>
                <li><strong>動画編集</strong>：3,000〜30,000円（時間による）</li>
                <li><strong>Webサイト制作</strong>：30,000〜200,000円</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 6: 購入対応 === */}
          <Section>
            <SectionTitle eyebrow="Section 6" num="5" title="購入されたあとの対応" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="購入通知が来たら即返信" accent={T.green}>
                通知が来たら、<strong>24時間以内</strong>にお礼メッセージを送る。早ければ早いほど評価UP。
              </SubStep>
              <SubStep num="②" title="ヒアリングを行う" accent={T.green}>
                「いつまでに必要ですか？」「どんなイメージですか？」など、必要な情報を引き出す。
              </SubStep>
              <SubStep num="③" title="作業 → 納品" accent={T.green}>
                約束した納期内に作業し、ココナラ内の「トーク画面」からファイル添付で納品。
              </SubStep>
              <SubStep num="④" title="修正依頼があれば対応" accent={T.green}>
                依頼者から「ここを直してほしい」と来たら、丁寧に対応。事前に「修正○回まで」と決めておくとスムーズ。
              </SubStep>
              <SubStep num="⑤" title="「正式な納品」ボタンをタップ" accent={T.green}>
                完成したら、トーク画面の「<strong>正式な納品</strong>」をタップ。これで取引完了の流れに入ります。
              </SubStep>
              <SubStep num="⑥" title="購入者が「評価」して取引完了" accent={T.green}>
                購入者が5段階の評価をすると、報酬が確定して売上に反映されます。
              </SubStep>
            </Card>

            <TipBox type="naru" title="返信メッセージのテンプレ">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 8px"}}><strong>＜購入時のお礼＞</strong><br/>
                この度はサービスをご購入いただき、誠にありがとうございます。<br/>
                精一杯ご対応させていただきます。<br/>
                早速ヒアリングをさせていただきたいのですが、以下の点を教えていただけますでしょうか？<br/>
                ①〇〇<br/>②〇〇<br/>③〇〇</p>

                <p style={{margin: "0 0 8px"}}><strong>＜納品時のメッセージ＞</strong><br/>
                お待たせいたしました。〇〇のご納品をさせていただきます。<br/>
                ご確認のうえ、修正があれば遠慮なくお申し付けください。</p>

                <p style={{margin: 0}}><strong>＜取引完了時の挨拶＞</strong><br/>
                この度はお取引いただき、ありがとうございました。<br/>
                またのご縁がございましたら、お気軽にご連絡ください。</p>
              </div>
            </TipBox>

            <TipBox type="alert" title="トラブルへの対応">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.95}}>
                <li><strong>無理な要求</strong>（規定外の追加作業など）→ 丁寧に断ってOK。「サービス範囲外」とハッキリ伝える。</li>
                <li><strong>連絡が途絶えた購入者</strong> → ココナラ事務局に相談すれば対応してくれる。</li>
                <li><strong>低評価をつけられた</strong> → 一度受け止め、次に活かす。理不尽な評価なら事務局に相談。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 7: 報酬の受け取り === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 7" num="6" title="売上金の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="売上は「ポイント」として貯まる" accent={T.green}>
                取引完了後、ココナラ内の「売上金」に反映。手数料22%が引かれた後の金額。
              </SubStep>
              <SubStep num="②" title="銀行振込で現金化" accent={T.green}>
                マイページの「振込申請」から銀行口座を登録して申請。<strong>3,000円から振込可能</strong>。
              </SubStep>
              <SubStep num="③" title="振込日は申請の翌週金曜日" accent={T.green}>
                毎週金曜日に振込される仕組み。土日祝日を挟むと翌営業日に。
              </SubStep>
              <SubStep num="④" title="振込手数料に注意" accent={T.green}>
                <strong>1回ごとに160円</strong>（3万円以下の場合）または<strong>250円</strong>（3万円超）の手数料。まとめて振込する方が手数料を節約できます。
              </SubStep>
            </Card>

            <TipBox type="alert" title="税金のこと">
              副業の純利益が<strong>年間20万円を超えたら確定申告が必要</strong>です。20万円以下なら所得税の申告は不要ですが、住民税の申告は必要な場合があるので市区町村に確認を。<br/><br/>
              <strong>経費として計上できるもの：</strong><br/>
              ✓ パソコン・ペンタブなどの機材費（一部）<br/>
              ✓ Adobe・Canva Proなどのソフト代<br/>
              ✓ 通信費の一部<br/>
              ✓ 参考書籍代
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{
                  padding: "10px 18px", borderRadius: 980,
                  background: T.pink, color: T.white, border: "none",
                  fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* === FAQ === */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "クラウドワークスとの違いは？", a: "ココナラは「あなたが商品を出品する」マーケット型。クラウドワークスは「依頼者の募集に応募する」エージェント型。営業が苦手で、自分のペースで売りたい人にはココナラがおすすめ。" },
                { q: "本当にスキルがなくても出品できる？", a: "できます！「誰かに教えられる経験」「相談に乗れる悩み」など、何でも商品化可能。占い・恋愛相談・子育て経験・ダイエット相談など、共感を得られる商品が売れています。" },
                { q: "サービスが売れない時はどうする？", a: "①サービス画像を変更（1枚目が一番大事）、②タイトルを見直し（検索キーワード追加）、③価格を下げる、④説明文を充実、⑤レビュー獲得のために初期は安く出す。改善を繰り返すのがポイント。" },
                { q: "なぜ手数料が22%と高い？", a: "ココナラは「集客」にコストをかけているため。CMやWeb広告で大量の購入者を集めているので、出品者は営業しなくても自然に売れる仕組み。営業コストを考えれば妥当。" },
                { q: "ブロックは可能？", a: "可能です。クレーマー的な購入者や不快なメッセージを送ってくる人をブロックして、今後の取引を防げます。" },
                { q: "顔写真は絶対に必要？", a: "必須ではありませんが、信頼度UPに繋がります。顔写真でなくてもOKで、似顔絵やオリジナルアイコンでも大丈夫。" },
                { q: "会社にバレない方法は？", a: "①住民税を「自分で納付」にする、②本名・職場をプロフィールに書かない、③SNSと連携しない、④顔写真を載せない。これでバレるリスクを大きく減らせます。" },
                { q: "スマホだけで完結する？", a: "完結します。公式アプリでサービス出品・メッセージ・納品まで可能。ただし、デザイン・動画編集などはパソコンの方が効率的。" },
                { q: "本人確認はしたほうがいい？", a: "強くおすすめ。本人確認済みバッジが付くと、購入者からの信頼度が大幅にUP。マイナンバーカードや免許証で5分で完了します。" },
                { q: "ココナラ独自の特典は？", a: "①プラチナランク（実績多数）で売れやすくなる、②ブログ機能でファン獲得、③Coconalaビジネスで法人向け案件、④ココナラの集客力を活用できる、⑤専門カスタマーサポートあり。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* === 困った時はナルに === */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                サービス出品でつまずいたり、購入対応で困ったら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* === 最終CTA === */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                あなたのスキルを、商品にしよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a
                href="https://coconala.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 980,
                  background: T.pink, color: T.white,
                  fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}
              >
                ココナラを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // ランサーズ完全ガイド
    if (showGuide === "lancers") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                ランサーズ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                登録から認定ランサー獲得、報酬受け取りまで。<br/>高単価案件を狙うならランサーズ🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約7分<br/>初案件まで：3日〜1週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金（手数料）</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>※ 報酬の5〜20%</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🎯</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>特徴</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>認定ランサー制度<br/>高単価案件が豊富</div>
              </Card>
            </div>
          </Section>

          {/* === Section 1: 準備するもの === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              ランサーズの登録に必要なものは、クラウドワークスとほぼ同じ。事前に揃えておきましょう。
            </p>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "Gmail（〜@gmail.com）や、お使いの〜@docomo.ne.jp、〜@ezweb.ne.jp、〜@softbank.ne.jpなど。確認メールを受け取れるアドレスならOK。" },
                { icon: "phone", title: "スマホかパソコン", desc: "どちらか1つで大丈夫。長文の応募メッセージを書くなら、パソコンの方が打ちやすい。" },
                { icon: "bank", title: "銀行口座の情報", desc: "報酬の振込先として後で必要になります。楽天銀行・ジャパンネット銀行は振込手数料が安くておすすめ。" },
                { icon: "id", title: "本人確認書類", desc: "運転免許証・マイナンバーカード・パスポートのいずれか1つ。本人確認すると「本人確認済みバッジ」がつき、案件獲得率が上がります。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <TipBox type="naru" title="ナルからのひとこと">
              <strong>ランサーズはクラウドワークスと併用する</strong>のがおすすめ🌱 同じ案件が両方に出ていることも多いから、登録しておけば案件選択肢が2倍に。手数料も少しランサーズの方が安い場合があるよ。
            </TipBox>
          </Section>

          {/* === Section 2: アカウント登録 === */}
          <Section>
            <SectionTitle eyebrow="Section 2 · 約7分" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="ランサーズのサイトを開く" accent={T.green}>
                ブラウザ（Safari、Chrome、Edgeなど）で <strong>lancers.jp</strong> にアクセス。または、このガイドの「サイトを開く」ボタンからジャンプ。
              </SubStep>
              <SubStep num="②" title="「無料会員登録」をタップ" accent={T.green}>
                画面の右上に<strong style={{color: T.pink}}>「無料会員登録」</strong>のオレンジ色のボタンがあります。これをタップ。
              </SubStep>
              <SubStep num="③" title="登録方法を選ぶ" accent={T.green}>
                ✓ メールアドレスで登録<br/>✓ Googleアカウントで登録（早い）<br/>✓ Yahoo! JAPAN IDで登録<br/>※ メールアドレスでの登録が一番シンプルで安心。
              </SubStep>
              <SubStep num="④" title="メールアドレスを入力" accent={T.green}>
                準備しておいたメールアドレスを入力。例：<code style={{fontFamily: "monospace", background: T.mute, padding: "2px 6px", borderRadius: 6}}>tanaka@gmail.com</code>
              </SubStep>
              <SubStep num="⑤" title="「会員登録メールを送信」をタップ" accent={T.green}>
                入力したメールアドレス宛に確認メールが届きます。
              </SubStep>
              <SubStep num="⑥" title="届いたメールのリンクをタップ" accent={T.green}>
                メールアプリを開いて、ランサーズから届いたメールを確認。本文の中にあるリンクをタップ。
              </SubStep>
              <SubStep num="⑦" title="基本情報を入力" accent={T.green}>
                ランサー名（仕事用のニックネーム、本名でなくてOK）、パスワード、性別、生年月日、職業区分などを入力。
              </SubStep>
              <SubStep num="⑧" title="「会員登録を完了する」をタップ" accent={T.green}>
                これで登録完了！ダッシュボードに遷移します。
              </SubStep>
            </Card>

            <TipBox type="warning" title="つまずきやすいポイント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>確認メールが届かない時</strong> → 「迷惑メールフォルダ」を確認。「@lancers.jp」を受信許可に。</li>
                <li><strong>パスワードは8文字以上の英数字混合</strong>。例：<code>Tanaka2026!</code></li>
                <li><strong>パスワードは必ずメモ</strong>。スマホのメモ帳や紙でも◎。</li>
                <li><strong>ランサー名は後から変えられる</strong>から、最初は仮でOK。</li>
              </ul>
            </TipBox>

            <TipBox type="naru" title="ナルからのひとこと">
              ランサーズではあなたの呼び名を「<strong>ランサー名</strong>」と呼びます。本名でなくてOKだから、覚えやすくて印象の良い名前にしよう🌱「タナカ」「Yuki」「sakura」など、シンプルなものがおすすめ。
            </TipBox>
          </Section>

          {/* === Section 3: プロフィール充実 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3 · 約30分" num="2" title="プロフィールを充実させる" accent={T.green}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              ランサーズはプロフィールの完成度が案件獲得率に大きく影響します。最初の30分でしっかり整えよう。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="プロフィール写真を設定" accent={T.green}>
                顔写真でなくてOK。風景・ペット・アイコン用イラストでも信頼度UP。「ない」より「ある」方が10倍応募が通りやすい。
              </SubStep>
              <SubStep num="②" title="自己紹介文を書く（最重要）" accent={T.green}>
                どんな経験があるか、何ができるか、どんな仕事をしたいかを書く。300〜500文字を目安に。下にテンプレートあり。
              </SubStep>
              <SubStep num="③" title="スキルを登録" accent={T.green}>
                「ライティング」「Webデザイン」「Excel」など、できることを選びます。<strong>5〜10個</strong>登録すると検索でヒットしやすい。
              </SubStep>
              <SubStep num="④" title="本人確認を済ませる" accent={T.green}>
                免許証・マイナンバーカードなどを撮影してアップロード。<strong>本人確認済みバッジ</strong>がつくと、依頼者からの信頼が大きく上がります。
              </SubStep>
              <SubStep num="⑤" title="ポートフォリオを登録" accent={T.green}>
                過去の作品や実績があればアップロード。なければ「練習で作ったもの」でもOK。実績はあなたの「営業ツール」になります。
              </SubStep>
            </Card>

            <TipBox type="naru" title="自己紹介文のテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 10px"}}><strong>はじめまして、〇〇と申します。</strong></p>
                <p style={{margin: "0 0 10px"}}>会社員として△△の仕事をしながら、ランサーズに登録しました。</p>
                <p style={{margin: "0 0 10px"}}><strong>【得意なこと】</strong><br/>・〇〇<br/>・△△<br/>・□□</p>
                <p style={{margin: "0 0 10px"}}><strong>【対応可能な時間】</strong><br/>平日：20時〜23時<br/>土日：終日対応可能</p>
                <p style={{margin: "0 0 10px"}}><strong>【お約束】</strong><br/>・納期は必ず守ります<br/>・連絡は24時間以内に返信します<br/>・丁寧なやりとりを心がけます</p>
                <p style={{margin: 0}}>初心者ですが、誠実に取り組みますのでよろしくお願いいたします。</p>
              </div>
            </TipBox>

            <TipBox type="tip" title="認定ランサー制度とは">
              ランサーズには「<strong>認定ランサー</strong>」という公式の制度があります。以下を達成すると認定され、案件単価が大幅UP！<br/><br/>
              ✓ 評価が5点満点中4.8以上<br/>
              ✓ 過去1年で5回以上の獲得実績<br/>
              ✓ 応答率80%以上<br/>
              ✓ 本人確認済み<br/><br/>
              認定ランサーになると、依頼者から優先的に声がかかるようになります。
            </TipBox>
          </Section>

          {/* === Section 4: 案件の探し方 === */}
          <Section>
            <SectionTitle eyebrow="Section 4 · 約5分" num="3" title="自分に合う案件の探し方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="「仕事を探す」をタップ" accent={T.pink}>
                画面上部のメニューから「仕事を探す」を選びます。
              </SubStep>
              <SubStep num="②" title="案件形式を選ぶ" accent={T.pink}>
                <strong>「プロジェクト」</strong>：オーダーメイドの仕事。1件3,000〜数十万円。応募 → 採用 → 納品の流れ。<br/><br/>
                <strong>「タスク」</strong>：簡単な単発作業。1件10〜500円程度。初心者向け。
              </SubStep>
              <SubStep num="③" title="検索条件で絞り込む" accent={T.pink}>
                ✓ カテゴリ（ライティング・デザインなど）<br/>✓ 報酬範囲<br/>✓ 「初心者OK」「未経験歓迎」のキーワード<br/>✓ 募集中の案件のみ
              </SubStep>
              <SubStep num="④" title="気になる案件を読む" accent={T.pink}>
                報酬・納期・依頼者の評価・募集人数を確認。応募者数も見て、5人以下の案件を狙うと採用率UP。
              </SubStep>
            </Card>

            <TipBox type="alert" title="怪しい案件を見分ける3つのサイン">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>「LINE登録してください」</strong> → ランサーズ規約違反、即離脱。</li>
                <li><strong>「副業で月100万円稼げます！」</strong> → ほぼ100%詐欺案件。</li>
                <li><strong>個人情報を最初から要求</strong>（住所・銀行口座など） → 業務に不必要な情報は渡さない。</li>
              </ul>
              迷ったら応募しない！が一番安全。
            </TipBox>
          </Section>

          {/* === Section 5: 応募とメッセージ === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 5" num="4" title="応募とメッセージのやりとり" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              応募メッセージの内容次第で「採用率」が大きく変わります。テンプレを使って気軽に応募してみよう。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="「提案する」ボタンをタップ" accent={T.pink}>
                案件ページの下にある「提案する」をタップ。応募画面に遷移。
              </SubStep>
              <SubStep num="②" title="提案文（応募メッセージ）を書く" accent={T.pink}>
                依頼者に向けた挨拶と、自分が適任である理由を簡潔に書く。<strong>テンプレ的な文章はNG</strong>。案件内容をしっかり読んでカスタマイズ。
              </SubStep>
              <SubStep num="③" title="提案金額を入力" accent={T.pink}>
                依頼者が「予算3〜5万円」と書いていたら、その範囲内で。初心者なら下限を提示すると採用率UP。
              </SubStep>
              <SubStep num="④" title="作業期間を入力" accent={T.pink}>
                依頼者の希望納期内で、余裕を持った期間を提示。
              </SubStep>
              <SubStep num="⑤" title="送信して返事を待つ" accent={T.pink}>
                数時間〜数日で返事が来ます。採用されたら「契約開始」のメッセージが届きます。
              </SubStep>
            </Card>

            <TipBox type="naru" title="提案文のテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 10px"}}><strong>○○様</strong></p>
                <p style={{margin: "0 0 10px"}}>はじめまして、△△と申します。<br/>この度はお仕事のご依頼を拝見し、ぜひお手伝いさせていただきたくご連絡しました。</p>
                <p style={{margin: "0 0 10px"}}><strong>【提案させていただく理由】</strong><br/>・私の□□のスキルが、ご依頼内容に活かせると考えております。<br/>・納期厳守・丁寧なコミュニケーションを心がけております。</p>
                <p style={{margin: "0 0 10px"}}><strong>【ご質問への回答】</strong><br/>（依頼文に質問があれば、ここで答える）</p>
                <p style={{margin: "0 0 10px"}}><strong>【作業期間と金額】</strong><br/>作業期間：○○日<br/>提案金額：○○円</p>
                <p style={{margin: 0}}>何卒よろしくお願いいたします。<br/>△△</p>
              </div>
            </TipBox>

            <TipBox type="tip" title="採用率を上げる5つのコツ">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>案件内容に合わせてカスタマイズ</strong>。同じ提案文の使い回しはバレる。</li>
                <li><strong>依頼者の質問にすべて答える</strong>。「未経験歓迎」と書いていても、経験がない場合は素直に「未経験ですが」と前置きする。</li>
                <li><strong>具体的な納品物のイメージを伝える</strong>。「こういう構成で書きます」など。</li>
                <li><strong>返信は24時間以内に</strong>。早ければ早いほど好印象。</li>
                <li><strong>1日10件応募</strong>。多くの案件に応募するほど採用率は上がる。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 6: 納品と完了報告 === */}
          <Section>
            <SectionTitle eyebrow="Section 6" num="5" title="納品と完了報告のやり方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="作業を完了させる" accent={T.green}>
                指示通りに作業します。文章ならWordやGoogleドキュメント、画像なら指定された形式で保存。
              </SubStep>
              <SubStep num="②" title="メッセージから納品ファイルを送信" accent={T.green}>
                ランサーズのメッセージ画面に「ファイル添付」ボタンがあります。完成したファイルをアップロード。
              </SubStep>
              <SubStep num="③" title="完了報告のメッセージを送る" accent={T.green}>
                「○○の作業が完了しましたのでご確認お願いします」と一言添える。
              </SubStep>
              <SubStep num="④" title="修正依頼があれば対応" accent={T.green}>
                依頼者から「ここを直してほしい」と来たら、丁寧に対応。1〜2回の修正は普通のことです。
              </SubStep>
              <SubStep num="⑤" title="依頼者が「検収」して完了" accent={T.green}>
                依頼者が「これでOK」と判断すると、自動的に報酬が確定。評価も付きます。
              </SubStep>
            </Card>

            <TipBox type="warning" title="納品時の注意">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li>納期は<strong>必ず守る</strong>。遅れそうな場合は早めに連絡。</li>
                <li>ファイル名は<strong>分かりやすく</strong>（例：「記事原稿_田中.docx」）。</li>
                <li>納品後の<strong>お礼メッセージ</strong>を送ると、評価率UP＆次回も依頼されやすい。</li>
                <li>評価が<strong>5点満点中4.8以上</strong>を保つと、認定ランサーへの道が開ける。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 7: 報酬の受け取り === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 7" num="6" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="銀行口座を登録する" accent={T.green}>
                マイページの「振込先口座」から、銀行口座の情報を登録。一度登録すれば次回からは不要。
              </SubStep>
              <SubStep num="②" title="案件完了後、報酬が「未払い」に" accent={T.green}>
                検収完了後、ランサーズ内に報酬がプールされます。<strong>段階制手数料</strong>が引かれます（次のセクション参照）。
              </SubStep>
              <SubStep num="③" title="月2回（15日・月末）に振込" accent={T.green}>
                報酬は<strong>月2回、15日と月末締めで翌営業日に振込</strong>。1,000円以上から振込可能。
              </SubStep>
              <SubStep num="④" title="振込手数料に注意" accent={T.green}>
                <strong>楽天銀行：100円 / その他の銀行：500円</strong>。楽天銀行が一番お得。
              </SubStep>
            </Card>

            <TipBox type="tip" title="ランサーズの段階制手数料">
              ランサーズの手数料は<strong>「報酬額が大きいほど安くなる」</strong>独自システム：<br/><br/>
              ✓ <strong>10万円超の部分</strong>：5%（業界最安級）<br/>
              ✓ <strong>10万円以下〜5万円超の部分</strong>：10%<br/>
              ✓ <strong>5万円以下の部分</strong>：20%<br/><br/>
              つまり、大きな案件をこなすほど手取りが多くなる。長期契約を獲得するメリットが大きい。
            </TipBox>

            <TipBox type="alert" title="税金のこと">
              副業の純利益が<strong>年間20万円を超えたら確定申告が必要</strong>です。20万円以下なら所得税の申告は不要ですが、住民税の申告は必要な場合があるので市区町村に確認を。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{
                  padding: "10px 18px", borderRadius: 980,
                  background: T.pink, color: T.white, border: "none",
                  fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* === FAQ === */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "クラウドワークスとの違いは？", a: "案件数はクラウドワークスがやや多いですが、ランサーズは「認定ランサー制度」「段階制の手数料（10万円超で5%）」「クライアントの質がやや高め」が特徴。両方登録するのがおすすめです。" },
                { q: "認定ランサーになると何が変わる？", a: "①プロフィールに金色のバッジが表示される、②依頼者からのスカウトが増える、③案件単価が約1.5倍に上がる、④検索結果で上位表示。最強の信用獲得方法です。" },
                { q: "顔写真は絶対に必要？", a: "いいえ、必須ではありません。ただしランサーズの「本人確認済みバッジ」は信頼度UPに直結。プロフィール画像はオリジナルアイコンや風景写真でもOK。" },
                { q: "会社にバレずに副業したい", a: "会社にバレる主な原因は「住民税の増額」。確定申告のときに「自分で納付（普通徴収）」を選べばバレにくくなります。社内で副業の話をしない、SNSで仕事内容を公開しないことも大切。" },
                { q: "スキルがなくてもできる？", a: "大丈夫！データ入力・アンケート回答・簡単な記事ライティングなど、スキル不問の案件が多数あります。「タスク」形式から始めるのがおすすめ。" },
                { q: "スマホだけで完結する？", a: "完結します！ランサーズの公式アプリで応募・メッセージ・納品まで可能。ただしWord文書を作る案件などは、パソコンの方が効率的。" },
                { q: "応募してもなかなか採用されない…", a: "①プロフィール完成度を上げる、②提案文を案件ごとにカスタマイズ、③本人確認を済ませる、④応募数を増やす（1日10件目標）、⑤応募価格を相場より少し下げる。これで採用率が大きく改善します。" },
                { q: "報酬が確定するまでどのくらい？", a: "案件完了から検収までは依頼者次第ですが、通常は数日〜1週間程度。検収後、月2回の振込日（15日・月末）に銀行振込されます。" },
                { q: "1案件でいくらくらい稼げる？", a: "初心者向けタスクなら1件10〜500円、プロジェクト案件なら3,000〜30,000円が目安。経験を積むと単価が上がり、月10万円以上も狙えます。" },
                { q: "ランサーズ独自の特典は？", a: "①Lancer of the Year（年間優秀ランサー賞）、②段階制手数料による手取りUP、③ランサーストア（自分のスキルを商品化）、④フリーランス向け保険・税理士サポート等。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* === 困った時はナルに === */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中につまずいたり、案件のことで困ったら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* === 最終CTA === */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！認定ランサーを目指そう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a
                href="https://www.lancers.jp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 980,
                  background: T.pink, color: T.white,
                  fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}
              >
                ランサーズを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // Uber Eats 配達パートナー完全ガイド
    if (showGuide === "ubereats") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                Uber Eats 配達員<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                登録から初回配達、報酬受け取りまで。<br/>自分の好きな時間に、自分のペースで稼げる副業🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>申請：約30分<br/>審査：2〜5日<br/>初配達まで：1週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：無料<br/>配達バッグ：3,000〜5,000円<br/>（自分で購入）</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>🚲</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要なもの</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホ＋自転車<br/>（または原付・バイク）</div>
              </Card>
            </div>
          </Section>

          {/* === Section 1: 準備するもの === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              他の副業より準備が少し多めですが、一度揃えればずっと使えます。
            </p>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ", desc: "iPhone・Androidどちらも対応。バッテリーの持ちが悪いと配達中に困るので、モバイルバッテリーも用意できると安心。" },
                { icon: "bicycle", title: "配達する乗り物", desc: "自転車（普通の自転車でOK）、原付（50ccまで）、バイク（125cc以下）、軽自動車のいずれか。電動アシスト自転車があると疲労が大幅に減ります。" },
                { icon: "bag", title: "配達バッグ", desc: "Amazonで「Uber Eats バッグ」と検索。3,000〜5,000円の保温保冷バッグ。Uber公式品でなくてもOKだが、料理が崩れない構造のものを選ぶ。" },
                { icon: "id", title: "本人確認書類", desc: "運転免許証・マイナンバーカード・パスポート・在留カードのいずれか1つ。スマホで撮影してアップロードします。" },
                { icon: "bank", title: "銀行口座", desc: "報酬の振込先。三井住友銀行・三菱UFJ・ゆうちょなど、どの銀行でもOK。" },
                { icon: "scooter", title: "原付・バイクの場合は追加書類", desc: "車検証（軽二輪以下）または軽自動車届出済証、自賠責保険証、任意保険証（推奨）。自転車のみの場合は不要。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <TipBox type="naru" title="ナルからのひとこと">
              <strong>初めての方は「自転車」スタートがおすすめ🚲</strong> 免許不要・登録書類が少なく、ガソリン代もかからない。慣れてきて「もっと稼ぎたい」と思ったら、バイクや原付にステップアップ！
            </TipBox>
          </Section>

          {/* === Section 2: アカウント登録 === */}
          <Section>
            <SectionTitle eyebrow="Section 2 · 約30分" num="1" title="配達パートナーに登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="公式サイトを開く" accent={T.green}>
                <strong>uber.com/jp/ja/drive/</strong> にスマホ・PCどちらからでもアクセス。または、このガイドの「サイトを開く」ボタンから。
              </SubStep>
              <SubStep num="②" title="「配達パートナーに登録」をタップ" accent={T.green}>
                ページ内の<strong style={{color: T.pink}}>「配達を始める」</strong>または「サインアップ」ボタンをタップ。
              </SubStep>
              <SubStep num="③" title="基本情報を入力" accent={T.green}>
                氏名（本名）、メールアドレス、電話番号、パスワードを入力。<strong>免許証と一致する氏名を必ず入れる</strong>。間違うと審査でやり直しに。
              </SubStep>
              <SubStep num="④" title="配達する都市を選ぶ" accent={T.green}>
                自分が住んでいる・配達したい都市を選択（東京・大阪・福岡など）。後で変更も可能。
              </SubStep>
              <SubStep num="⑤" title="配達する乗り物を選ぶ" accent={T.green}>
                「自転車」「原付（〜50cc）」「バイク（125cc以下）」「軽自動車」から選択。乗り物によって必要書類が変わります。
              </SubStep>
              <SubStep num="⑥" title="本人確認書類をアップロード" accent={T.green}>
                スマホのカメラで運転免許証・マイナンバーカードなどを撮影。<strong>4隅がはっきり写るように、明るい場所で撮る</strong>。
              </SubStep>
              <SubStep num="⑦" title="プロフィール写真を撮影" accent={T.green}>
                自分の顔写真を撮ります。<strong>サングラスやマスクはNG</strong>。明るい場所で正面から撮影。お客様への安心感のため必要。
              </SubStep>
              <SubStep num="⑧" title="銀行口座を登録" accent={T.green}>
                振込先の銀行・支店・口座番号・名義人を入力。<strong>口座名義人は登録した本人と一致させる</strong>こと。
              </SubStep>
              <SubStep num="⑨" title="申請完了 → 審査を待つ" accent={T.green}>
                通常<strong>2〜5日</strong>で審査結果がメールで届きます。書類に不備があれば「再提出のお願い」が来ることも。
              </SubStep>
            </Card>

            <TipBox type="warning" title="つまずきやすいポイント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>書類の写真がブレている</strong> → 一発で審査落ち。撮り直すこと。</li>
                <li><strong>パスポートの場合は顔写真のページだけでOK</strong>。マイナンバーカードは表面のみ。</li>
                <li><strong>申請後にメールが届かない</strong> → 迷惑メールフォルダを確認。ドメイン「@uber.com」を許可設定。</li>
              </ul>
            </TipBox>

            <TipBox type="naru" title="ナルからのひとこと">
              審査結果のメールが来るまでに、<strong>配達バッグを Amazon で注文しておく</strong>と効率的だよ🌱 届くまで2〜3日かかるから、審査と並行して準備しよう！
            </TipBox>
          </Section>

          {/* === Section 3: 配達バッグの準備 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3" num="2" title="配達バッグを準備する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="Amazon・楽天で購入" accent={T.green}>
                「<strong>Uber Eats 配達バッグ</strong>」または「<strong>フードデリバリーバッグ</strong>」で検索。3,000〜5,000円が相場。
              </SubStep>
              <SubStep num="②" title="選び方のポイント" accent={T.green}>
                ✓ 縦長すぎないもの（料理が傾く）<br/>
                ✓ 仕切り板付き（複数注文の時に便利）<br/>
                ✓ 30〜35Lの容量がベスト<br/>
                ✓ 反射材付き（夜間配達の安全）
              </SubStep>
              <SubStep num="③" title="到着したら開けて中身をチェック" accent={T.green}>
                バッグ本体・仕切り板・ストラップが揃っているか確認。
              </SubStep>
              <SubStep num="④" title="保温シートを準備" accent={T.green}>
                100均で売っているアルミ保温シートを底に敷くと、料理の温度を保ちやすい。
              </SubStep>
            </Card>

            <TipBox type="tip" title="あると便利な追加グッズ">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>スマホホルダー</strong>：自転車のハンドルに付けるタイプ（1,000〜2,000円）。ナビを見ながら走るのに必須。</li>
                <li><strong>モバイルバッテリー</strong>：配達中の充電切れ防止。10,000mAh以上推奨。</li>
                <li><strong>レインカバー</strong>：雨の日対策。バッグ用の防水カバー。</li>
                <li><strong>ヘルメット・反射ベスト</strong>：安全のため。バイク・原付は法律でヘルメット必須。</li>
                <li><strong>滑り止めシート</strong>：100均。バッグの中に敷くと料理が動かない。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 4: アプリ準備 === */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="Uber Driver アプリを準備する" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="App Store / Google Play で検索" accent={T.pink}>
                検索ワードは「<strong>Uber Driver</strong>」（Uber Eatsアプリとは別物なので注意）。配達パートナー専用の白いアイコンのアプリ。
              </SubStep>
              <SubStep num="②" title="アプリをインストール" accent={T.pink}>
                「入手」または「インストール」をタップ。無料です。
              </SubStep>
              <SubStep num="③" title="登録したメアドでログイン" accent={T.pink}>
                配達パートナー登録時のメールアドレスとパスワードを入力。
              </SubStep>
              <SubStep num="④" title="位置情報の許可" accent={T.pink}>
                「位置情報を常に許可」をタップ。これがないと配達依頼が届きません。
              </SubStep>
              <SubStep num="⑤" title="通知の許可" accent={T.pink}>
                「通知を許可」もタップ。配達依頼の通知が来るようになります。
              </SubStep>
            </Card>

            <TipBox type="warning" title="位置情報・通知は必須">
              位置情報を「許可しない」にすると、配達依頼が一切来ません。「常に許可」を選びましょう。プライバシーが気になる場合は、稼働中だけ「常に許可」、終わったら「使用中のみ」に切り替えるのも◎。
            </TipBox>
          </Section>

          {/* === Section 5: 初回配達 === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 5" num="4" title="初めての配達に挑戦" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              準備が整ったら、いよいよ初配達！緊張するかもしれませんが、アプリが全て案内してくれます。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリを起動" accent={T.pink}>
                配達バッグを準備し、自転車・バイクに乗って、配達エリアに移動してから起動。
              </SubStep>
              <SubStep num="②" title="「出発」ボタンをタップ" accent={T.pink}>
                画面下中央の<strong style={{color: T.pink}}>「出発」</strong>または「オンライン」ボタンをタップ。これで配達依頼が来る状態に。
              </SubStep>
              <SubStep num="③" title="配達依頼が来るのを待つ" accent={T.pink}>
                通常1〜30分以内に依頼が来ます。ピークタイム（昼食・夕食時）ならすぐ来ます。
              </SubStep>
              <SubStep num="④" title="依頼を受けるか判断" accent={T.pink}>
                依頼通知には<strong>店舗までの距離・お客様までの距離・報酬</strong>が表示。タップすれば受注、無視すれば拒否（評価には影響しない）。
              </SubStep>
              <SubStep num="⑤" title="店舗へ向かう" accent={T.pink}>
                アプリ内のマップで店舗の場所を確認。Googleマップなどのナビと連携可能。
              </SubStep>
              <SubStep num="⑥" title="店舗で料理を受け取る" accent={T.pink}>
                到着したら<strong>「Uber Eatsの配達員です」</strong>と声をかけ、注文番号を伝える。料理を受け取ったら、店員さんの目の前でアプリの「受け取り完了」をタップ。
              </SubStep>
              <SubStep num="⑦" title="お客様へ届ける" accent={T.pink}>
                バッグに料理を入れて、お客様の住所へ向かう。<strong>傾けないように丁寧に</strong>。
              </SubStep>
              <SubStep num="⑧" title="お客様に渡す" accent={T.pink}>
                到着したら、アプリで「到着」をタップ。お客様の指示通り、手渡し or 玄関先などへ。最後に<strong>「配達完了」</strong>をタップ。
              </SubStep>
              <SubStep num="⑨" title="お客様を評価＆コメント" accent={T.pink}>
                「いいね・ふつう・よくない」の評価をして、初配達完了！
              </SubStep>
            </Card>

            <TipBox type="naru" title="初配達のコツ">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>1件目は近い場所の依頼を選ぼう</strong>。慣れるまで遠くは避けて。</li>
                <li><strong>店員さんに「初めてです」と伝えてOK</strong>。教えてくれる人も多い。</li>
                <li><strong>料理は水平に保つ</strong>。傾くとスープがこぼれる原因に。</li>
                <li><strong>お客様への挨拶は「Uber Eatsです」</strong>でOK。シンプルに。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 6: 効率よく稼ぐ === */}
          <Section>
            <SectionTitle eyebrow="Section 6" num="5" title="効率よく稼ぐコツ" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="ピークタイムを狙う" accent={T.green}>
                <strong>昼：11:00〜14:00</strong>、<strong>夜：18:00〜21:30</strong>が一番依頼が多い。この時間帯だけ稼働するだけで効率◎。
              </SubStep>
              <SubStep num="②" title="ブースト（配達料アップ）を活用" accent={T.green}>
                需要が高い時、アプリに<strong>「1.2倍」「1.5倍」「2倍」</strong>のブースト表示が出る。同じ配達でも報酬が増える絶好のチャンス。
              </SubStep>
              <SubStep num="③" title="雨の日は稼ぎ時" accent={T.green}>
                雨の日は注文が増え、ブーストもかかりやすい。<strong>雨具を装備して挑む</strong>と1日2万円も可能。
              </SubStep>
              <SubStep num="④" title="効率的なエリアを覚える" accent={T.green}>
                オフィス街（昼）と住宅街（夜）が黄金エリア。空き時間に商業ビルの近くで待機すると依頼が来やすい。
              </SubStep>
              <SubStep num="⑤" title="クエスト（特別ボーナス）" accent={T.green}>
                「3日で30件配達したら3,000円ボーナス」など、定期的にクエストが出ます。アプリの「クエスト」タブで確認。
              </SubStep>
              <SubStep num="⑥" title="複数注文の依頼を受ける" accent={T.green}>
                同じ店舗から複数のお客様への配達依頼が来ることも。<strong>効率3倍</strong>になるのでおすすめ。
              </SubStep>
            </Card>

            <TipBox type="tip" title="稼げる目安">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>初心者（1日3時間）</strong>：3,000〜5,000円</li>
                <li><strong>慣れてきた人（1日4時間）</strong>：6,000〜10,000円</li>
                <li><strong>ガッツリ稼ぐ人（1日8時間）</strong>：15,000〜25,000円</li>
                <li><strong>雨の日のピーク時</strong>：時給3,000円超えも</li>
              </ul>
              月20万円以上稼ぐ「専業配達員」もいますが、副業なら<strong>週末だけで月3〜5万円</strong>が現実的なライン。
            </TipBox>
          </Section>

          {/* === Section 7: 報酬の受け取り === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 7" num="6" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="週単位で集計される" accent={T.green}>
                月〜日曜の週単位で報酬が集計されます。アプリの「収入」タブから確認可能。
              </SubStep>
              <SubStep num="②" title="毎週水曜に銀行振込" accent={T.green}>
                前週分の報酬が<strong>翌週水曜日</strong>に登録した銀行口座に自動振込されます。
              </SubStep>
              <SubStep num="③" title="インスタント送金（即時受取）" accent={T.green}>
                週払いを待たず、配達完了後すぐに受け取れる「Instant Pay」機能あり。<strong>1回50円程度の手数料</strong>がかかるけど、急ぎでお金が必要な時に便利。
              </SubStep>
              <SubStep num="④" title="明細を確認" accent={T.green}>
                アプリの「収入」→「明細」から、配達ごとの報酬・チップ・ブーストの内訳を見られる。
              </SubStep>
            </Card>

            <TipBox type="alert" title="税金のこと（重要）">
              Uber Eats配達員は<strong>「業務委託（個人事業主）」扱い</strong>。給与所得ではないので、副業として年間20万円超の利益が出たら確定申告が必要です。<br/><br/>
              <strong>経費として計上できるもの：</strong><br/>
              ✓ 配達バッグの購入費<br/>
              ✓ 自転車・バイクのメンテナンス費<br/>
              ✓ ガソリン代<br/>
              ✓ スマホ通信費の一部<br/>
              ✓ 雨具・モバイルバッテリー
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{
                  padding: "10px 18px", borderRadius: 980,
                  background: T.pink, color: T.white, border: "none",
                  fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* === FAQ === */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "自転車だけでも稼げる？", a: "稼げます！都心部のオフィス街・住宅密集エリアなら、短い距離での配達が多いので自転車で十分。電動アシスト自転車があれば疲れにくく、長時間稼働もできます。" },
                { q: "週何時間くらい働けば月3万円稼げる？", a: "目安として週末（土日）の昼か夜のピークタイム3時間×4週で月20件〜30件配達。1件あたり平均500〜800円の報酬を考えると、月3万円は十分現実的。慣れれば短時間で増やせます。" },
                { q: "事故った時はどうなる？", a: "配達中の事故はUber側が「対人・対物の障害保険」を用意しています。ただし任意保険にも加入しておくと安心。バイク・原付の場合は自賠責保険が必須です。" },
                { q: "雨や雪の日は無理に出なきゃダメ？", a: "完全に自由です。アプリを起動しなければ働く必要なし。ただし悪天候はブーストがかかりやすく稼ぎ時でもあるので、雨具を装備して短時間だけ稼働するのもアリ。" },
                { q: "店員さんや客との会話で困ったら？", a: "Uber Eatsは基本的に短いやり取りだけ。店員さん：「Uber Eatsです、注文番号〇〇お願いします」、お客様：「お待たせしました、お料理です」これだけでOK。" },
                { q: "配達中にトラブルが起きたら？", a: "アプリ内に「サポート」ボタンがあります。商品破損・客とのトラブル・道に迷ったなど、何でもすぐ相談できます。料理がこぼれた場合は写真を撮って報告。" },
                { q: "配達が来ない時はどうする？", a: "立つ場所を変えてみる、ピークタイムまで待つ、別エリアに移動するなどを試して。週末の繁華街なら依頼が途切れることはほぼありません。" },
                { q: "確定申告で経費はどこまでOK？", a: "「業務に必要だった」と説明できるものは全部経費に。配達バッグ・自転車購入費（按分）・メンテナンス・ガソリン・通信費の一部・モバイルバッテリーなど。レシートは必ず保管。" },
                { q: "副業を会社にバレない方法は？", a: "①住民税を「自分で納付」に切り替え、②社内で副業の話をしない、③SNSで配達中の写真をアップしない。特に住民税の切り替えが重要です。" },
                { q: "配達員同士でやり取りはある？", a: "TwitterやLINEオープンチャットで「Uber Eats配達員」のコミュニティが活発。情報交換や悩み相談ができます。気が合えば飲み仲間にも。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* === 困った時はナルに === */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中・配達中につまずいたら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* === 最終CTA === */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                自由な時間で稼ぐ、始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a
                href="https://www.uber.com/jp/ja/drive/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 980,
                  background: T.pink, color: T.white,
                  fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}
              >
                Uber Eats配達員に登録する
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // メルカリ完全ガイド
    if (showGuide === "mercari") {
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                メルカリ<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                登録から商品の出品、発送、報酬受け取りまで。<br/>家にある不用品を、スマホ1台でお小遣いに🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約3分<br/>初出品まで：10分</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録・利用：無料<br/>※ 売上の10%が手数料</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>📱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要な機械</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホがおすすめ<br/>（カメラ付き）</div>
              </Card>
            </div>
          </Section>

          {/* === Section 1: 準備するもの === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              メルカリは「スマホ1台あれば、即始められる」のが魅力。これだけ用意してください。
            </p>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "phone", title: "スマホ（カメラ付き）", desc: "メルカリは公式アプリが基本。商品写真を撮るのでカメラが必要。iPhone・Androidどちらも対応。" },
                { icon: "email", title: "メールアドレス", desc: "Gmail・docomo・auなど、確認メールを受け取れるアドレス。SMS認証もあるので、電話番号も用意。" },
                { icon: "package", title: "売りたい不用品", desc: "服・本・家電・コスメ・おもちゃなど、家にある「使わなくなったもの」がそのままお金に。" },
                { icon: "bank", title: "銀行口座（後でOK）", desc: "売上を現金で受け取るときに必要。すぐ売り始める場合は後から登録でも大丈夫。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <TipBox type="naru" title="ナルからのひとこと">
              「何を売ればいいかわからない」って人は、まずは<strong>本・服・小さな家電</strong>からがおすすめ🌱 軽くて梱包しやすく、送料も安いから初心者向けだよ。読まなくなった本や着なくなった服から始めよう！
            </TipBox>
          </Section>

          {/* === Section 2: アプリ登録 === */}
          <Section>
            <SectionTitle eyebrow="Section 2 · 約3分" num="1" title="メルカリアプリをダウンロード＆登録" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="App StoreまたはGoogle Playを開く" accent={T.green}>
                iPhoneは「App Store」、Androidは「Playストア」をタップ。
              </SubStep>
              <SubStep num="②" title="「メルカリ」で検索してインストール" accent={T.green}>
                検索バーに「<strong>メルカリ</strong>」と入力。赤い「m」のアイコンの公式アプリを「入手」または「インストール」。
              </SubStep>
              <SubStep num="③" title="アプリを開いて「会員登録」をタップ" accent={T.green}>
                アプリが開いたら「<strong style={{color: T.pink}}>はじめる</strong>」をタップ。
              </SubStep>
              <SubStep num="④" title="登録方法を選ぶ" accent={T.green}>
                「Google」「LINE」「Apple ID」のいずれかでログイン、または「メールアドレスで登録」を選べます。<strong>メールアドレスでの登録</strong>が一番シンプル。
              </SubStep>
              <SubStep num="⑤" title="必要情報を入力" accent={T.green}>
                ニックネーム（本名でなくてOK）、パスワード、生年月日、電話番号を入力。電話番号にSMS（ショートメール）で4桁の認証番号が届きます。
              </SubStep>
              <SubStep num="⑥" title="SMS認証番号を入力して完了" accent={T.green}>
                届いた4桁の番号をアプリに入力すれば、登録完了！
              </SubStep>
            </Card>

            <TipBox type="warning" title="つまずきやすいポイント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>SMS認証が届かない時</strong> → 1〜2分待つか、「再送信」をタップ。それでもダメなら電話番号を確認。</li>
                <li><strong>ニックネームは後で変えられる</strong>から、深く悩まなくてOK。</li>
                <li><strong>招待コードを入力すると500ポイントもらえる</strong>。お得なのでチェック。</li>
              </ul>
            </TipBox>

            <TipBox type="naru" title="ナルからのひとこと">
              登録の途中で迷ったら、アプリの「<strong>戻る</strong>」を押せば前の画面に戻れるよ。間違えても大丈夫、何度でもやり直せるから安心してね🌱
            </TipBox>
          </Section>

          {/* === Section 3: 出品 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3 · 約5分" num="2" title="商品を出品する" accent={T.green}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              ここがメルカリの中心！スマホで写真を撮って、説明を書いて、出品します。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="アプリ下の「出品」ボタンをタップ" accent={T.green}>
                画面の下中央に黄色いカメラのマーク「出品」があります。これをタップ。
              </SubStep>
              <SubStep num="②" title="商品の写真を撮る（4〜10枚）" accent={T.green}>
                「カメラで撮影」または「アルバムから選択」。<strong>正面・横・後ろ・拡大・キズや汚れの部分</strong>など、複数の角度から撮るのがコツ。
              </SubStep>
              <SubStep num="③" title="商品名を入力" accent={T.green}>
                <strong>ブランド名・色・サイズ</strong>を含めると検索されやすい。例：「ユニクロ レディース Mサイズ 黒 ニット」
              </SubStep>
              <SubStep num="④" title="カテゴリーを選ぶ" accent={T.green}>
                「レディース → トップス → ニット」のように選んでいきます。AIが自動で提案してくれることも。
              </SubStep>
              <SubStep num="⑤" title="商品の状態を選ぶ" accent={T.green}>
                「新品・未使用」「目立った傷や汚れなし」「やや傷や汚れあり」など6段階から選びます。正直に選ぶのが大切。
              </SubStep>
              <SubStep num="⑥" title="商品説明を書く" accent={T.green}>
                サイズ、購入時期、使用回数、傷の有無などを丁寧に。後でテンプレートを紹介します。
              </SubStep>
              <SubStep num="⑦" title="配送方法と価格を設定" accent={T.green}>
                送料は「出品者負担」が売れやすい。配送方法は<strong>「らくらくメルカリ便」</strong>がおすすめ（匿名配送・追跡あり・補償付き）。価格は次のセクションで詳しく。
              </SubStep>
              <SubStep num="⑧" title="「出品する」ボタンをタップ" accent={T.green}>
                確認画面が出るので、間違いがなければ「出品する」。一覧に表示されたら出品完了！
              </SubStep>
            </Card>

            <TipBox type="naru" title="商品説明のテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 8px"}}>ご覧いただきありがとうございます。</p>
                <p style={{margin: "0 0 8px"}}>＜商品の状態＞<br/>○○ヶ月前に△△円で購入。□回ほど使用しました。目立った傷や汚れはありません。</p>
                <p style={{margin: "0 0 8px"}}>＜サイズ・素材＞<br/>サイズ：Mサイズ<br/>素材：綿100%</p>
                <p style={{margin: "0 0 8px"}}>＜発送について＞<br/>らくらくメルカリ便でお送りします。<br/>ご購入後1〜2日以内に発送いたします。</p>
                <p style={{margin: 0}}>気になる点があればコメントでお気軽にお尋ねください。</p>
              </div>
            </TipBox>
          </Section>

          {/* === Section 4: 価格設定 === */}
          <Section>
            <SectionTitle eyebrow="Section 4" num="3" title="売れる価格の決め方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="同じ商品の相場を調べる" accent={T.pink}>
                メルカリで「商品名」と検索。<strong>「販売中」と「売り切れ」</strong>の両方を見て、いくらで売れているかチェック。
              </SubStep>
              <SubStep num="②" title="売り切れの方が大事" accent={T.pink}>
                「売り切れ」の価格が「実際に売れた値段」。販売中の価格は希望価格で、実際は売れていないことも。
              </SubStep>
              <SubStep num="③" title="相場より少しだけ安く" accent={T.pink}>
                同じような商品が3,000円で売れていたら、自分は<strong>2,700〜2,900円</strong>くらいで出品。すると先に売れる確率UP。
              </SubStep>
              <SubStep num="④" title="手数料と送料を引いて計算" accent={T.pink}>
                例：3,000円で売る → 手数料300円（10%）＋送料210円（らくらくメルカリ便ネコポス）＝ <strong>手取り 2,490円</strong>
              </SubStep>
            </Card>

            <TipBox type="tip" title="売れる価格の例">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>ユニクロの服</strong>：500〜1,500円</li>
                <li><strong>読み終わった本</strong>：100〜500円（マンガはセット販売が◎）</li>
                <li><strong>使わなくなったスマホ</strong>：5,000〜30,000円</li>
                <li><strong>ベビー用品</strong>：意外と需要あり。出産祝いの未使用品など</li>
                <li><strong>ブランドバッグ</strong>：10,000円〜（査定サイトで価格チェック推奨）</li>
              </ul>
            </TipBox>

            <TipBox type="warning" title="価格設定のNG">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li>相場より高すぎ → ずっと売れない</li>
                <li>相場より極端に安すぎ → 「何か問題があるのでは？」と疑われる</li>
                <li>送料を出品者負担にしないと、買い手の心理ハードルが上がる</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 5: コメント・購入対応 === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 5" num="4" title="コメント・購入時の対応" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              出品後、商品にコメントが付いたり、購入されたりします。スムーズなやり取りが評価UPの鍵。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="コメント通知が来たら早めに返信" accent={T.pink}>
                アプリの通知から確認。<strong>24時間以内の返信</strong>が理想。
              </SubStep>
              <SubStep num="②" title="値下げ交渉には冷静に対応" accent={T.pink}>
                「もう少しお安くなりませんか？」というコメントが多くきます。値下げするかは自由ですが、極端な値下げは断ってOK。
              </SubStep>
              <SubStep num="③" title="購入されたらすぐ取引メッセージ" accent={T.pink}>
                「ご購入ありがとうございます。○月○日までに発送します」と最初に挨拶。
              </SubStep>
              <SubStep num="④" title="梱包と発送" accent={T.pink}>
                次のセクションで詳しく解説。
              </SubStep>
            </Card>

            <TipBox type="naru" title="返信メッセージのテンプレ集">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 8px"}}><strong>＜購入時の挨拶＞</strong><br/>ご購入ありがとうございます。○月○日までに発送いたします。よろしくお願いいたします。</p>
                <p style={{margin: "0 0 8px"}}><strong>＜値下げ要求への返答（OKの場合）＞</strong><br/>コメントありがとうございます。○○円までであれば値下げ可能です。専用ページをご希望でしたらお声がけください。</p>
                <p style={{margin: "0 0 8px"}}><strong>＜値下げ要求への返答（NGの場合）＞</strong><br/>コメントありがとうございます。申し訳ございませんが、現状の価格でのお取引をお願いしております。</p>
                <p style={{margin: 0}}><strong>＜発送通知＞</strong><br/>本日発送いたしました。到着までしばらくお待ちください。</p>
              </div>
            </TipBox>

            <TipBox type="alert" title="注意すべきコメント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>LINE交換を求めるコメント</strong> → 無視。メルカリの規約違反です。</li>
                <li><strong>外部サイトでの取引を持ちかけられた</strong> → 詐欺の可能性大。応じない。</li>
                <li><strong>横取りコメント</strong>（他の人が交渉中に「即購入します」） → 早い者勝ちなのでメルカリでは認められています。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 6: 梱包・発送 === */}
          <Section>
            <SectionTitle eyebrow="Section 6 · 約15分" num="5" title="梱包と発送のやり方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="梱包資材を用意" accent={T.green}>
                100均（ダイソー・セリア）で揃います：<strong>OPP袋（透明袋）・プチプチ（緩衝材）・ダンボール・ガムテープ</strong>。コンビニでも買えます。
              </SubStep>
              <SubStep num="②" title="商品を丁寧に梱包" accent={T.green}>
                壊れやすいものはプチプチで包む → OPP袋に入れる → 段ボールやクッション封筒に入れる。<strong>水濡れ対策</strong>として、最低限OPP袋には入れたい。
              </SubStep>
              <SubStep num="③" title="アプリで「らくらくメルカリ便」を選択" accent={T.green}>
                取引画面の「<strong>配送方法</strong>」から選びます。発送場所は<strong>セブンイレブン・ファミリーマート・ヤマト営業所</strong>から選択可能。
              </SubStep>
              <SubStep num="④" title="2次元バーコードを表示" accent={T.green}>
                アプリに表示される<strong>QRコード（2次元バーコード）</strong>をコンビニのレジに見せると、宛名なしで発送できます。
              </SubStep>
              <SubStep num="⑤" title="店員さんに渡して送り状を受け取る" accent={T.green}>
                店員さんが送り状を印刷してくれます。商品に貼って終了。レシートは保管しておくと安心。
              </SubStep>
              <SubStep num="⑥" title="アプリで「発送通知」をタップ" accent={T.green}>
                発送後、必ずアプリで「発送通知」を押します。買い手に発送完了の連絡が行きます。
              </SubStep>
            </Card>

            <TipBox type="tip" title="送料の目安（らくらくメルカリ便）">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>ネコポス</strong>：A4サイズ・厚さ3cmまで → <strong>210円</strong>（本・薄手の服など）</li>
                <li><strong>宅急便コンパクト</strong>：専用BOX（70円） → <strong>450円</strong>（小型家電・複数の服など）</li>
                <li><strong>宅急便60サイズ</strong>：60cmまで → <strong>750円</strong>（大きめの服・本セットなど）</li>
                <li><strong>宅急便80サイズ</strong>：80cmまで → <strong>850円</strong>（バッグ・小さな家電など）</li>
              </ul>
            </TipBox>

            <TipBox type="warning" title="梱包の注意">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>過剰梱包NG、雑すぎもNG</strong>。商品が壊れない程度に。</li>
                <li>箱は<strong>商品サイズに合ったもの</strong>を選ぶ。大きすぎる箱は送料が高くなる。</li>
                <li><strong>納品書や領収書を入れる必要はない</strong>。匿名配送だから個人情報も書かなくてOK。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 7: 取引完了と評価 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 7" num="6" title="取引完了と評価" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="商品が買い手に届く" accent={T.green}>
                配送の追跡はアプリで確認できます。通常は発送から1〜3日で届きます。
              </SubStep>
              <SubStep num="②" title="買い手から「受取評価」が来る" accent={T.green}>
                受け取った買い手が「良い・普通・悪い」のいずれかで評価します。
              </SubStep>
              <SubStep num="③" title="出品者も買い手を評価" accent={T.green}>
                同じく「良い・普通・悪い」で評価。お礼コメントも添えると◎。
              </SubStep>
              <SubStep num="④" title="評価完了で売上金が確定" accent={T.green}>
                両者の評価が完了すると、売上金が「使える状態」になります。
              </SubStep>
            </Card>

            <TipBox type="naru" title="お礼メッセージのテンプレ">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                この度はお取引いただきありがとうございました。<br/>
                スムーズにご対応いただき、感謝しております。<br/>
                またのご縁がありましたら、よろしくお願いいたします。
              </div>
            </TipBox>
          </Section>

          {/* === Section 8: 売上の受け取り === */}
          <Section>
            <SectionTitle eyebrow="Section 8" num="7" title="売上金の受け取り方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="売上金は3つの使い道がある" accent={T.pink}>
                <strong>(1) メルカリで別の商品を買う</strong>（手数料無料・一番お得）<br/>
                <strong>(2) メルペイ残高として街中で買い物</strong>（コンビニ・スーパーなどで使える）<br/>
                <strong>(3) 銀行口座に振込</strong>（一番現金にしやすいけど手数料200円）
              </SubStep>
              <SubStep num="②" title="銀行振込の手順" accent={T.pink}>
                マイページ →「<strong>売上金</strong>」→「お振込申請」→ 銀行口座を登録 → 金額を指定。<strong>1〜4営業日</strong>で振込されます。
              </SubStep>
              <SubStep num="③" title="手数料を抑えるコツ" accent={T.pink}>
                <strong>10,000円以上のお振込で手数料が無料</strong>になることもあります（条件はアプリ内で確認）。コツコツ貯めてからまとめて振込すると◎。
              </SubStep>
              <SubStep num="④" title="売上金には有効期限あり" accent={T.pink}>
                売上金は<strong>180日（約6ヶ月）以内</strong>に使うか振込申請しないと失効します。本人確認（マイナンバーカード等）をすると無期限になるので、長期保有したい人は本人確認を済ませよう。
              </SubStep>
            </Card>

            <TipBox type="alert" title="税金のこと">
              <strong>自分が使った不用品の売却</strong>は原則として非課税です（譲渡所得・50万円まで）。ただし<strong>転売目的の仕入れ販売</strong>は「雑所得」となり、年間20万円超で確定申告が必要になります。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{
                  padding: "10px 18px", borderRadius: 980,
                  background: T.pink, color: T.white, border: "none",
                  fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* === FAQ === */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "出品から何日で売れる？", a: "商品次第ですが、人気商品なら数時間〜1日、平均で1〜2週間程度。1ヶ月以上売れない場合は、価格を下げるか写真・説明を見直してみましょう。" },
                { q: "本人確認は必要？", a: "出品・購入だけなら不要ですが、本人確認すると「メルペイ」が使えるようになり、売上金の有効期限もなくなります。マイナンバーカードや免許証で5分で完了します。" },
                { q: "写真は何枚撮ればいい？", a: "最低でも4枚、できれば10枚（最大数）まで使い切るのがおすすめ。正面・横・後ろ・タグ・キズ部分・全体感など、購入者が知りたい情報を網羅。" },
                { q: "売れない時はどうする？", a: "①写真の撮り直し（明るく・複数角度）、②価格を10〜20%下げる、③タイトルにキーワード追加、④商品説明を充実、⑤再出品（一度削除してまた出品）。" },
                { q: "梱包資材は何を使えばいい？", a: "100均で十分。OPP袋・プチプチ・ダンボール・ガムテープがあれば大体OK。コンビニや郵便局でも買えますが、100均が一番安い。" },
                { q: "発送が遅れそう…どうしよう？", a: "正直に連絡しましょう。「○日まで発送が遅れます。申し訳ございません」と伝えれば、ほとんどの買い手は理解してくれます。連絡しないと評価が下がるので注意。" },
                { q: "クレーマーに当たったら？", a: "落ち着いて対応。明らかに不当な要求は「メルカリ事務局」に相談できます。アプリの「お問い合わせ」から通報も可能。1人で抱え込まず、相談しましょう。" },
                { q: "メルカリで儲かるって本当？", a: "「副業」というよりは「不用品をお金に変える」感覚が現実的。月数千〜数万円のお小遣い稼ぎが目安。本格的に稼ぐなら「仕入れて売る」ビジネスが必要で、これは確定申告対象になります。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* === 困った時はナルに === */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                出品中につまずいたり、買い手とのやり取りで困ったら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* === 最終CTA === */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                家にある不用品を、お金に変えよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a
                href="https://www.mercari.com/jp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 980,
                  background: T.pink, color: T.white,
                  fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}
              >
                メルカリを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // クラウドワークス完全ガイド
    if (showGuide === "crowdworks") {
      // Reusable mini components
      const SectionTitle = ({eyebrow, title, num, accent = T.pink}) => (
        <div style={{marginBottom: 24}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: 14, background: accent + "20", color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.sans, fontWeight: 800, fontSize: 17, flexShrink: 0,
            }}>{num}</div>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2, color: T.primary}}>{title}</h2>
          </div>
        </div>
      );
      const TipBox = ({type = "tip", title, children}) => {
        const styles = {
          tip:     { bg: T.greenBg,  border: T.green,  color: "#456A2E", icon: "lightbulb" },
          warning: { bg: T.yellowBg, border: T.yellow, color: "#7A5A0A", icon: "warning" },
          alert:   { bg: T.orangeBg, border: T.orange, color: "#8A3F0A", icon: "alert" },
          naru:    { bg: T.pinkBg,   border: T.pink,   color: T.primary, icon: "sprout" },
        }[type];
        return (
          <div style={{background: styles.bg, borderRadius: 20, padding: "18px 22px", border: `2px solid ${styles.border}40`, margin: "14px 0"}}>
            <div style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
              <div style={{flexShrink: 0, color: styles.color, display: "flex", alignItems: "center"}}><Icon name={styles.icon} size={22} strokeWidth={2}/></div>
              <div style={{flex: 1, minWidth: 0}}>
                {title && <div style={{fontFamily: T.sans, fontSize: 13, fontWeight: 800, color: styles.color, marginBottom: 6, letterSpacing: "0.02em"}}>{title}</div>}
                <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.primary, fontWeight: 500}}>{children}</div>
              </div>
            </div>
          </div>
        );
      };
      const SubStep = ({num, title, children, accent = T.pink}) => (
        <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, padding: "16px 0", borderBottom: `1.5px dashed ${T.borderLight}`}}>
          <div style={{minWidth: 32, height: 32, borderRadius: "50%", background: accent + "20", color: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, fontWeight: 800, fontSize: 13, flexShrink: 0}}>{num}</div>
          <div>
            <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 6}}>{title}</div>
            <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500}}>{children}</div>
          </div>
        </div>
      );

      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowGuide(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← サイト一覧に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: `linear-gradient(180deg, ${T.pinkSoft} 0%, ${T.soft} 100%)`}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Complete Guide</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                クラウドワークス<br/><span style={{color: T.pink}}>完全ガイド</span>
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: 0, fontWeight: 500}}>
                登録から初めての案件獲得、報酬の受け取りまで。<br/>機械が苦手でも大丈夫、ナルが一緒にサポートします🌱
              </p>
            </div>
          </section>

          {/* Quick Info */}
          <Section>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12}}>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>⏱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>所要時間</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録：約5分<br/>初案件まで：3日〜1週間</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>💰</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>料金</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>登録・利用：無料<br/>※ 報酬の20%が手数料</div>
              </Card>
              <Card style={{padding: "20px 22px"}}>
                <div style={{fontSize: 24, marginBottom: 8}}>📱</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 700, marginBottom: 4}}>必要な機械</div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, lineHeight: 1.6}}>スマホ または<br/>パソコン（どちらでも）</div>
              </Card>
            </div>
          </Section>

          {/* === Section 1: 準備するもの === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 1" num="0" title="始める前に準備するもの" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              登録をスムーズに進めるため、最初にこれだけ用意しておきましょう。
            </p>
            <div style={{display: "grid", gap: 12}}>
              {[
                { icon: "email", title: "メールアドレス", desc: "Gmail（〜@gmail.com）や、お使いの〜@docomo.ne.jp、〜@ezweb.ne.jp、〜@softbank.ne.jpなど。確認メールを受け取れるアドレスならOK。" },
                { icon: "phone", title: "スマホかパソコン", desc: "どちらか1つで大丈夫。スマホの方がアプリでサクサク使えるのでおすすめ。" },
                { icon: "bank", title: "銀行口座の情報", desc: "報酬の振込先として後で必要になります。今すぐではなく、案件が完了する頃に登録すればOK。" },
                { icon: "id", title: "本人確認書類（後でOK）", desc: "運転免許証・マイナンバーカード・パスポートのいずれか1つ。撮影してアップロードするので手元に。" },
              ].map(item => (
                <div key={item.title} style={{
                  background: T.white, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.borderLight}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{color: T.pink, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: T.pinkBg}}><Icon name={item.icon} size={26} strokeWidth={2}/></div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{item.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.8, color: T.secondary, fontWeight: 500}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <TipBox type="naru" title="ナルからのひとこと">
              <strong>メールアドレスがわからない場合</strong>、スマホの「設定」→「メール」または「アカウント」から確認できるよ。あとで使うので、自分のメアドはメモしておくと安心🌱
            </TipBox>
          </Section>

          {/* === Section 2: アカウント登録 === */}
          <Section>
            <SectionTitle eyebrow="Section 2 · 約5分" num="1" title="アカウントを登録する" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="クラウドワークスのサイトを開く" accent={T.green}>
                ブラウザ（Safari、Chrome、Edgeなど）で <strong>crowdworks.jp</strong> にアクセスします。または、このガイドの「サイトを開く」ボタンからジャンプ。
              </SubStep>
              <SubStep num="②" title="「会員登録（無料）」をタップ" accent={T.green}>
                画面の右上または中央に <strong style={{color: T.pink}}>「会員登録」</strong> のオレンジ色のボタンがあります。これをタップ。
              </SubStep>
              <SubStep num="③" title="メールアドレスを入力" accent={T.green}>
                準備しておいたメールアドレスを入力します。例：<code style={{fontFamily: "monospace", background: T.mute, padding: "2px 6px", borderRadius: 6}}>tanaka@gmail.com</code>
              </SubStep>
              <SubStep num="④" title="「登録メールを送信」をタップ" accent={T.green}>
                入力したメールアドレス宛に確認メールが届きます。
              </SubStep>
              <SubStep num="⑤" title="届いたメールのリンクをタップ" accent={T.green}>
                メールアプリを開いて、クラウドワークスから届いたメールを確認。本文の中にあるリンクをタップ。
              </SubStep>
              <SubStep num="⑥" title="プロフィール情報を入力" accent={T.green}>
                ニックネーム（本名でなくてOK）、パスワード、生年月日、職業、住所などを入力します。10分くらいで完了。
              </SubStep>
            </Card>

            <TipBox type="warning" title="つまずきやすいポイント">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.85}}>
                <li><strong>確認メールが届かない時</strong> → 「迷惑メールフォルダ」を確認。それでもなければ、メアドの打ち間違いをチェック。</li>
                <li><strong>パスワードは8文字以上の英数字</strong>。例：<code>Tanaka2026!</code>のように大文字・小文字・数字を混ぜると安全。</li>
                <li><strong>パスワードは必ずメモ</strong>。スマホのメモ帳や紙でも◎。忘れるとログインできなくなります。</li>
              </ul>
            </TipBox>

            <TipBox type="naru" title="ナルからのひとこと">
              ニックネームは本名じゃなくていいんだよ。「やまだ太郎」じゃなくて「タロウ」とか「Tanaka」とかでもOK。気軽に決めよう🌱
            </TipBox>
          </Section>

          {/* === Section 3: プロフィール設定 === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 3 · 約30分" num="2" title="プロフィールを充実させる" accent={T.green}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              プロフィールは「あなたの第一印象」。ここをしっかり書くと、案件を受注しやすくなります。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="自己紹介文を書く（とても大事）" accent={T.green}>
                どんな経験があるか、何ができるか、どんな仕事をしたいかを書きます。下に書き方の例があります。
              </SubStep>
              <SubStep num="②" title="スキルを登録" accent={T.green}>
                「ライティング」「データ入力」「Excel」など、できることを選びます。1つでも複数でもOK。
              </SubStep>
              <SubStep num="③" title="プロフィール写真は任意" accent={T.green}>
                顔写真でなくてOK。風景・ペット・自分が描いたイラストでも大丈夫。「ない」より「ある」方が信頼されやすいです。
              </SubStep>
              <SubStep num="④" title="本人確認の手続き" accent={T.green}>
                免許証・マイナンバーカードなどを撮影してアップロード。本人確認済みのバッジが付くと、案件獲得率が大きく上がります。
              </SubStep>
            </Card>

            <TipBox type="naru" title="自己紹介文のテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 10px"}}><strong>はじめまして、〇〇と申します。</strong></p>
                <p style={{margin: "0 0 10px"}}>会社員として△△の仕事をしながら、副業としてクラウドワークスに登録しました。</p>
                <p style={{margin: "0 0 10px"}}>得意なことは「文章を書くこと」「データ入力」「Excelの基本操作」です。納期は必ず守り、丁寧なやり取りを心がけます。</p>
                <p style={{margin: 0}}>初心者ですので、わからないことはきちんと質問させていただきます。よろしくお願いいたします。</p>
              </div>
            </TipBox>
          </Section>

          {/* === Section 4: 案件の探し方 === */}
          <Section>
            <SectionTitle eyebrow="Section 4 · 約5分" num="3" title="自分に合う案件の探し方" accent={T.pink}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="「仕事を探す」をタップ" accent={T.pink}>
                画面上部のメニューから「仕事を探す」を選びます。たくさんの案件が一覧で見られます。
              </SubStep>
              <SubStep num="②" title="検索ワードに「初心者OK」と入力" accent={T.pink}>
                上の検索バーに「初心者OK」「未経験OK」と入れて検索。経験がなくても応募できる案件が出てきます。
              </SubStep>
              <SubStep num="③" title="「タスク形式」を選ぶと簡単" accent={T.pink}>
                タスク形式は「1件いくら」の単発の小さな仕事。10円〜500円程度で、慣れるのに最適。
              </SubStep>
              <SubStep num="④" title="気になる案件を読む" accent={T.pink}>
                報酬・期日・作業内容・依頼者の評価を確認。納得できれば応募します。
              </SubStep>
            </Card>

            <TipBox type="alert" title="怪しい案件を見分ける3つのサイン">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>「簡単で高収入」「誰でも月50万円！」</strong>などの誇大表現があるもの</li>
                <li><strong>LINE登録を要求するもの</strong>（クラウドワークス内ではLINE誘導は基本NG）</li>
                <li><strong>個人情報を最初から要求するもの</strong>（住所・銀行口座など）</li>
              </ul>
              迷ったら応募しない！が一番安全。
            </TipBox>
          </Section>

          {/* === Section 5: 応募とメッセージ === */}
          <Section style={{background: T.pinkSoft}}>
            <SectionTitle eyebrow="Section 5" num="4" title="応募とメッセージのやりとり" accent={T.pink}/>
            <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.85, color: T.secondary, margin: "0 0 20px", fontWeight: 500}}>
              応募の文章次第で「採用される確率」が大きく変わります。テンプレを使って気軽に応募してみましょう。
            </p>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="「応募する」ボタンをタップ" accent={T.pink}>
                案件ページの下にある「応募する」をタップ。
              </SubStep>
              <SubStep num="②" title="応募メッセージを書く" accent={T.pink}>
                依頼者に向けた挨拶と、なぜ自分が適任かを簡潔に書きます。
              </SubStep>
              <SubStep num="③" title="送信して返事を待つ" accent={T.pink}>
                数時間〜数日で返事が来ます。採用されたら「契約開始」のメッセージが届きます。
              </SubStep>
            </Card>

            <TipBox type="naru" title="応募メッセージのテンプレ（コピペOK）">
              <div style={{background: T.white, borderRadius: 12, padding: "14px 16px", marginTop: 8, fontFamily: T.sans, fontSize: 13, lineHeight: 1.85, color: T.primary}}>
                <p style={{margin: "0 0 10px"}}><strong>○○様</strong></p>
                <p style={{margin: "0 0 10px"}}>はじめまして、△△と申します。<br/>この度はお仕事のご依頼を拝見し、ぜひ応募させていただきたくご連絡しました。</p>
                <p style={{margin: "0 0 10px"}}>クラウドワークスは始めたばかりですが、納期厳守・丁寧なやり取りを心がけております。ご要望に沿った成果をお届けできるよう精一杯対応いたします。</p>
                <p style={{margin: 0}}>何卒よろしくお願いいたします。<br/>△△</p>
              </div>
            </TipBox>

            <TipBox type="tip" title="やりとりのコツ">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li><strong>返事は24時間以内に</strong>。早いほど信頼を得られます。</li>
                <li><strong>わからないことは遠慮なく質問</strong>。トラブルを未然に防げます。</li>
                <li><strong>クラウドワークス内のメッセージだけ使う</strong>。LINEやメール誘導は規約違反のリスクあり。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 6: 納品と完了報告 === */}
          <Section>
            <SectionTitle eyebrow="Section 6" num="5" title="納品と完了報告のやり方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="作業を完了させる" accent={T.green}>
                指示通りに作業します。文章ならWordやGoogleドキュメント、画像なら指定された形式で保存。
              </SubStep>
              <SubStep num="②" title="メッセージから納品ファイルを送信" accent={T.green}>
                クラウドワークスのメッセージ画面に「ファイル添付」ボタンがあります。そこから完成したファイルをアップロードします。
              </SubStep>
              <SubStep num="③" title="完了報告のメッセージを送る" accent={T.green}>
                「○○の作業が完了しましたのでご確認お願いします」と一言添えます。
              </SubStep>
              <SubStep num="④" title="修正依頼があれば対応" accent={T.green}>
                依頼者から「ここを直してほしい」と来たら、丁寧に対応。1〜2回の修正は普通のことです。
              </SubStep>
              <SubStep num="⑤" title="「検収」されたら完了" accent={T.green}>
                依頼者が「これでOK」と判断すると、自動的に報酬が確定します。
              </SubStep>
            </Card>

            <TipBox type="warning" title="納品時の注意">
              <ul style={{margin: 0, paddingLeft: 18, lineHeight: 1.9}}>
                <li>納期は<strong>必ず守る</strong>。遅れそうな場合は早めに連絡。</li>
                <li>ファイル名は<strong>分かりやすく</strong>（例：「記事原稿_田中.docx」）。</li>
                <li>納品後の<strong>お礼メッセージ</strong>を送ると、評価が良くなり次回も依頼されやすい。</li>
              </ul>
            </TipBox>
          </Section>

          {/* === Section 7: 報酬の受け取り === */}
          <Section style={{background: T.greenBg}}>
            <SectionTitle eyebrow="Section 7" num="6" title="報酬の受け取り方" accent={T.green}/>
            <Card style={{padding: "28px 28px"}}>
              <SubStep num="①" title="銀行口座を登録する" accent={T.green}>
                マイページの「振込先口座」から、銀行口座の情報を登録します。一度登録すれば次回からは不要。
              </SubStep>
              <SubStep num="②" title="案件完了後、報酬が「未払い」に" accent={T.green}>
                検収完了後、クラウドワークス内に報酬がプールされます（システム手数料20%が引かれます）。
              </SubStep>
              <SubStep num="③" title="月末に締め、翌月15日に振込" accent={T.green}>
                毎月15日に、銀行口座に振り込まれます。1,000円以上から振込可能。
              </SubStep>
              <SubStep num="④" title="振込手数料に注意" accent={T.green}>
                楽天銀行：100円 / その他の銀行：500円 が引かれます。楽天銀行が一番お得。
              </SubStep>
            </Card>

            <TipBox type="alert" title="税金のこと">
              副業の純利益が<strong>年間20万円を超えたら確定申告が必要</strong>です。20万円以下なら所得税の申告は不要ですが、住民税の申告は必要な場合があるので市区町村に確認を。
              <div style={{marginTop: 12}}>
                <button onClick={()=>{setShowGuide(null); setTab("tax");}} style={{
                  padding: "10px 18px", borderRadius: 980,
                  background: T.pink, color: T.white, border: "none",
                  fontFamily: T.sans, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}>確定申告を確認する →</button>
              </div>
            </TipBox>
          </Section>

          {/* === FAQ === */}
          <Section>
            <SectionTitle eyebrow="FAQ" num="?" title="よくある質問" accent={T.pink}/>
            <div style={{display: "grid", gap: 12}}>
              {[
                { q: "顔写真は絶対に必要？", a: "いいえ、必須ではありません。ただし「ある方が信頼されやすい」のは事実。風景写真や、自分のニックネームをデザインした画像でも大丈夫。" },
                { q: "会社にバレずに副業したい", a: "会社にバレる主な原因は「住民税の増額」。確定申告のときに「自分で納付（普通徴収）」を選べばバレにくくなります。また、社内で副業の話をしない、SNSで仕事内容を公開しないことも大切。" },
                { q: "スキルがなくてもできる？", a: "大丈夫です！データ入力・アンケート回答・簡単な記事ライティングなど、スキル不問の案件がたくさんあります。最初は単価が低くても、続けていくうちにスキルも単価も上がります。" },
                { q: "スマホだけで完結する？", a: "完結します！クラウドワークスは公式アプリもあり、応募・メッセージ・納品・報酬確認まですべてスマホで可能。ただしWord文書を作る案件などは、パソコンの方が便利です。" },
                { q: "怪しい案件を間違って応募してしまったら？", a: "応募メッセージのやり取りでおかしいと思ったら、契約せず辞退すればOK。LINE登録を要求された、個人情報を要求された等の場合は、クラウドワークス公式の「お問い合わせ」から通報できます。" },
                { q: "報酬が確定するまでどのくらい？", a: "案件完了から検収までは依頼者次第ですが、通常は数日〜1週間程度。検収完了後の翌月15日に銀行振込されます。" },
                { q: "プロフィール写真を間違えて顔写真にしてしまった", a: "あとから何度でも変更できます。マイページの「プロフィール編集」から、画像の変更・削除が可能です。" },
                { q: "1案件でいくらくらい稼げる？", a: "初心者向けタスクなら1件10〜500円、プロジェクト案件なら3,000〜30,000円が目安。経験を積むと単価が上がり、月10万円以上も狙えます。" },
              ].map((f, i) => (
                <Card key={i} style={{padding: "20px 24px"}}>
                  <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.pink, marginBottom: 8, display: "flex", gap: 10}}>
                    <span>Q.</span><span>{f.q}</span>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, fontWeight: 500, paddingLeft: 26}}>
                    {f.a}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* === 困った時はナルに === */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
                <Character pose="default" size={100}/>
              </div>
              <Eyebrow>Need Help?</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.3, color: T.primary}}>
                わからないこと、何でも聞いてね
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                登録中につまずいたり、案件のことで困ったら、ボクに気軽に相談してね🌱
              </p>
              <CTA onClick={()=>{setShowGuide(null); setTab("chat");}}>ナルに相談する →</CTA>
            </Card>
          </Section>

          {/* === 最終CTA === */}
          <Section>
            <Card style={{padding: "36px 32px", textAlign: "center", background: T.greenBg, border: `2px solid ${T.green}30`}}>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 700, margin: "0 0 12px", color: T.primary}}>
                準備は万全！始めてみよう🌱
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.85, color: T.secondary, margin: "0 0 24px", fontWeight: 500}}>
                このガイドはいつでも見直せるので、つまずいたら戻ってきてね。
              </p>
              <a
                href="https://crowdworks.jp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 32px", borderRadius: 980,
                  background: T.pink, color: T.white,
                  fontFamily: T.sans, fontSize: 16, fontWeight: 800,
                  textDecoration: "none", letterSpacing: "0.02em",
                  boxShadow: `0 4px 0 0 #6BA053`,
                }}
              >
                クラウドワークスを開く
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7"/>
                  <path d="M8 7H17V16"/>
                </svg>
              </a>
            </Card>
          </Section>
        </div>
      );
    }

    // 20万円以内ガイド
    if (showUnder20) {
      const methods = [
        { num: "01", title: "不用品の売却", target: "月3,000〜10,000円", accent: T.pink, bg: T.pinkBg,
          desc: "メルカリ・ラクマで自分の使ったものを売る方法",
          detail: "自分が使ったものの売却は「譲渡所得」扱いで、原則として50万円までは非課税。20万円ルールの対象外なので気にせず売れます。ただし、定期的に仕入れて販売する「転売」は「雑所得」になり、20万円ルールが適用されます。" },
        { num: "02", title: "ポイ活", target: "月1,000〜5,000円", accent: T.green, bg: T.greenBg,
          desc: "アプリやサイトでポイントを貯めて換金",
          detail: "ハピタス・モッピー・ポイントタウンなどに登録。買い物のついでにポイントを貯めて、楽天ポイントやPayPayに換金。月数千円なら気軽に始められます。本業の合間にやれるのが魅力。" },
        { num: "03", title: "アンケートモニター", target: "月2,000〜8,000円", accent: T.yellow, bg: T.yellowBg,
          desc: "アンケート回答で報酬がもらえるサービス",
          detail: "マクロミル・リサーチパネル・infoQなどに登録。1回50〜数百円の回答を、スキマ時間にコツコツ。本業の合間にやりやすく、初期投資もほぼゼロ。" },
        { num: "04", title: "単発バイト・タイミー", target: "月5,000〜15,000円", accent: T.orange, bg: T.orangeBg,
          desc: "スポットで1日だけ働けるバイトサービス",
          detail: "タイミー・シェアフルなどのアプリで、1日数時間〜のスポットバイト。給与所得として扱われるので、雑所得の20万円ルールとは別計算。本業の給与と別に20万円超なら確定申告必要。" },
        { num: "05", title: "小規模クラウドソーシング", target: "月3,000〜10,000円", accent: T.pink, bg: T.pinkBg,
          desc: "月1〜3件に絞ってWebライティングなど",
          detail: "クラウドワークスやランサーズで、月1〜3件の小さな案件だけに絞って受注。本格的に稼ぐより「ちょっとお小遣い稼ぎ」感覚で続けるイメージで、スキルアップにもなります。" },
      ];
      const cautions = [
        { title: "経費の水増しはNG", desc: "実際に使っていない経費を計上するのは脱税にあたります。事実に基づいた申告を。" },
        { title: "複数副業の合算を忘れずに", desc: "複数の副業をしている場合は、合計の純利益で20万円判定されます。" },
        { title: "住民税の申告は別途必要", desc: "所得税の確定申告が不要でも、住民税の申告は必要なケースが多いので市区町村に確認を。" },
      ];
      return (
        <div>
          {/* Back */}
          <section style={{padding: "48px 24px 0"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setShowUnder20(false)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, fontWeight: 700,
              }}>← 副業診断に戻る</button>
            </div>
          </section>

          {/* Hero */}
          <section style={{padding: "32px 24px 56px", textAlign: "center", background: T.soft}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
                <Character pose="wave" size={140}/>
              </div>
              <Eyebrow>Casual Side Income</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px", lineHeight: 1.15, color: T.primary}}>
                気軽に始める<br/>
                <span style={{color: T.pink}}>20万円以内の副業</span>。
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 1.8, color: T.secondary, margin: 0, fontWeight: 500}}>
                確定申告ナシで楽しめる、ちょうどいい副業ガイド🌱
              </p>
            </div>
          </section>

          {/* What is 20万円 rule */}
          <Section>
            <Eyebrow>20万円ルールとは</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px", lineHeight: 1.2, color: T.primary}}>確定申告がいらない金額</h2>
            <Card style={{padding: "32px 28px"}}>
              <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 1.9, color: T.primary, margin: "0 0 16px", fontWeight: 500}}>
                会社員（給与所得者）が副業をする場合、副業の<strong style={{color: T.pink}}>純利益（収入−経費）が年間20万円以下</strong>なら、所得税の確定申告は不要です。
              </p>
              <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.8, color: T.secondary, margin: 0}}>
                手続きの手間がないため、まず副業を始めてみたい人や、本業に集中しながら少しだけお小遣いを増やしたい人にぴったり。
              </p>
            </Card>
          </Section>

          {/* Monthly target visual */}
          <Section style={{background: T.pinkSoft}}>
            <div style={{textAlign: "center"}}>
              <Eyebrow>Monthly Target</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 32px", lineHeight: 1.2, color: T.primary}}>
                月に<span style={{color: T.pink}}>15,000円</span>が目安
              </h2>
              <div style={{
                background: T.white, borderRadius: 28, padding: "28px 24px",
                border: `2px solid ${T.pink}30`, maxWidth: 480, margin: "0 auto",
              }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: T.sans, fontWeight: 700, flexWrap: "wrap"}}>
                  <span style={{fontSize: 22, color: T.primary}}>20万円</span>
                  <span style={{fontSize: 18, color: T.tertiary}}>÷</span>
                  <span style={{fontSize: 22, color: T.primary}}>12ヶ月</span>
                  <span style={{fontSize: 18, color: T.tertiary}}>=</span>
                  <span style={{fontSize: 28, color: T.pink}}>16,666円</span>
                </div>
                <p style={{fontFamily: T.sans, fontSize: 13, color: T.secondary, margin: "16px 0 0", lineHeight: 1.7}}>
                  余裕を持って<strong>月15,000円</strong>を目安にすると安心。月によって変動してもOK、年間合計で判断されます。
                </p>
              </div>
            </div>
          </Section>

          {/* 5 Methods */}
          <Section>
            <Eyebrow>5 Methods</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.2, color: T.primary}}>おすすめの5つの方法</h2>
            <p style={{fontFamily: T.sans, fontSize: 14, color: T.secondary, margin: "0 0 28px", lineHeight: 1.7}}>業種を選ばずに、20万円以内で気軽にできる副業を厳選しました</p>
            <div style={{display: "grid", gap: 16}}>
              {methods.map(m => (
                <div key={m.num} style={{
                  background: T.white, borderRadius: 28, padding: "26px 28px",
                  border: `2px solid ${T.borderLight}`, boxShadow: `0 4px 0 0 ${T.borderLight}`,
                }}>
                  <div style={{display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14}}>
                    <div style={{
                      minWidth: 44, height: 44, borderRadius: 14,
                      background: m.bg, color: m.accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: T.sans, fontWeight: 800, fontSize: 16, flexShrink: 0,
                    }}>{m.num}</div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <h3 style={{fontFamily: T.sans, fontSize: 20, fontWeight: 700, color: T.primary, margin: "0 0 4px", letterSpacing: "-0.01em"}}>{m.title}</h3>
                      <div style={{fontFamily: T.sans, fontSize: 13, color: m.accent, fontWeight: 700, marginBottom: 4}}>{m.desc}</div>
                      <span style={{
                        display: "inline-block",
                        fontFamily: T.sans, fontSize: 11, fontWeight: 700,
                        padding: "4px 10px", borderRadius: 980,
                        background: m.bg, color: m.accent,
                      }}>目安：{m.target}</span>
                    </div>
                  </div>
                  <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.8, color: T.secondary, margin: 0, fontWeight: 500}}>{m.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Use expenses smartly */}
          <Section style={{background: T.greenBg}}>
            <Eyebrow>Expenses Tip</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px", lineHeight: 1.2, color: T.primary}}>経費を上手に使う</h2>
            <Card style={{padding: "32px 28px"}}>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.9, color: T.primary, margin: "0 0 20px", fontWeight: 500}}>
                副業のために使ったお金は<strong style={{color: T.pink}}>経費</strong>として計上できます。経費を引いた金額が「純利益」になるので、結果的に20万円以内に収めやすくなります。
              </p>
              <div style={{
                background: T.soft, borderRadius: 18, padding: "20px 22px",
                fontFamily: T.sans, fontSize: 14, lineHeight: 1.9,
              }}>
                <div style={{fontWeight: 700, color: T.green, marginBottom: 8, fontSize: 13, letterSpacing: "0.05em"}}>📊 計算例</div>
                <div style={{display: "flex", justifyContent: "space-between", padding: "4px 0"}}>
                  <span style={{color: T.secondary}}>副業収入</span><span style={{fontWeight: 700, color: T.primary}}>250,000円</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", padding: "4px 0"}}>
                  <span style={{color: T.secondary}}>− 経費（PC・書籍・通信費）</span><span style={{fontWeight: 700, color: T.primary}}>50,000円</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", padding: "8px 0 0", borderTop: `2px solid ${T.borderLight}`, marginTop: 8}}>
                  <span style={{fontWeight: 700, color: T.primary}}>= 純利益</span><span style={{fontWeight: 800, color: T.green, fontSize: 17}}>200,000円</span>
                </div>
              </div>
              <p style={{fontFamily: T.sans, fontSize: 13, color: T.tertiary, margin: "16px 0 0", lineHeight: 1.7}}>※ 領収書は必ず保管しましょう。万が一調査が入った場合の証拠になります。</p>
            </Card>
          </Section>

          {/* Cautions */}
          <Section>
            <Eyebrow>Important</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px", lineHeight: 1.2, color: T.primary}}>やってはいけないこと</h2>
            <div style={{display: "grid", gap: 12}}>
              {cautions.map(c => (
                <div key={c.title} style={{
                  background: T.orangeBg, borderRadius: 22, padding: "20px 24px",
                  border: `2px solid ${T.orange}30`,
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: T.orange,
                    color: T.white, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 800, flexShrink: 0,
                  }}>!</div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 4}}>{c.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, lineHeight: 1.7, color: T.secondary, fontWeight: 500}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* When close to 20万円 */}
          <Section style={{background: T.pinkSoft}}>
            <Card style={{padding: "40px 32px", textAlign: "center"}}>
              <Eyebrow>If you're close to 20万円</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", lineHeight: 1.3, color: T.primary}}>
                もし20万円を超えそうになったら
              </h2>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.9, color: T.secondary, margin: "0 0 28px", fontWeight: 500}}>
                確定申告は意外と簡単。国税庁のサイトやfreeeなどのソフトを使えば、質問に答えるだけで書類が完成します🌱
              </p>
              <CTA onClick={()=>setTab("tax")}>確定申告の準備を確認する →</CTA>
            </Card>
          </Section>

          {/* Back to job recommendation */}
          <Section>
            <div style={{textAlign: "center"}}>
              <p style={{fontFamily: T.sans, fontSize: 14, color: T.secondary, marginBottom: 20}}>もっと本格的に稼ぎたい場合は</p>
              <CTA secondary onClick={()=>setShowUnder20(false)}>副業診断に戻る</CTA>
            </div>
          </Section>
        </div>
      );
    }

    // Step Detail View
    if (selectedJob && selectedStep !== null) {
      const j = selectedJob;
      const s = j.step[selectedStep];
      const stepLabels = ["登録・準備", "実践・行動", "成長・収益化"];
      const stepColors = [
        {bg: T.pinkBg, c: T.pink, name: "stepStart"},
        {bg: T.greenBg, c: T.green, name: "stepAction"},
        {bg: T.yellowBg, c: T.yellow, name: "stepGrow"},
      ];
      const sc = stepColors[selectedStep];
      return (
        <div>
          <section style={{padding: "48px 24px 24px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setSelectedStep(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.pink, background: "none", border: "none",
                cursor: "pointer", padding: 0, marginBottom: 24, fontWeight: 700,
              }}>← {j.name}の概要に戻る</button>
            </div>
          </section>

          {/* Hero with step illustration */}
          <section style={{padding: "0 24px 48px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{
                background: sc.bg, borderRadius: 36, padding: "40px 32px",
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                border: `2px solid ${sc.c}40`,
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "8px 18px", background: T.white, borderRadius: 980,
                  marginBottom: 20, border: `2px solid ${sc.c}`,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%", background: sc.c, color: T.white,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800,
                  }}>{selectedStep+1}</span>
                  <span style={{fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: sc.c, letterSpacing: "0.08em"}}>STEP {selectedStep+1} / 3 · {stepLabels[selectedStep]}</span>
                </div>
                <h1 style={{fontFamily: T.sans, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 24px", color: T.primary, letterSpacing: "-0.01em"}}>
                  {s.title}
                </h1>
                <div style={{maxWidth: 320}}>
                  <HeroIllustration name={s.ill} maxWidth={320}/>
                </div>
              </div>
            </div>
          </section>

          {/* Detail content */}
          <section style={{padding: "0 24px 32px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <Card style={{padding: "36px 32px"}}>
                <Eyebrow>くわしい解説</Eyebrow>
                <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 2, color: T.primary, margin: 0, fontWeight: 500}}>
                  {s.detail}
                </p>
              </Card>
            </div>
          </section>

          {/* Tips */}
          <section style={{padding: "0 24px 48px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <Eyebrow>ポイント</Eyebrow>
              <h3 style={{fontFamily: T.sans, fontSize: 24, fontWeight: 700, margin: "0 0 24px", color: T.primary}}>成功のコツ {s.tips.length}つ</h3>
              <div style={{display: "grid", gap: 12}}>
                {s.tips.map((tip,i)=>(
                  <div key={i} style={{
                    background: T.white, borderRadius: 22, padding: "20px 24px",
                    border: `2px solid ${T.borderLight}`,
                    display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", background: sc.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: sc.c, fontSize: 16, fontWeight: 800, flexShrink: 0,
                    }}>✓</div>
                    <div style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.7, color: T.primary, fontWeight: 500}}>{tip}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation between steps */}
          <section style={{padding: "0 24px 64px"}}>
            <div style={{maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
              <button onClick={()=> selectedStep > 0 && setSelectedStep(selectedStep - 1)}
                disabled={selectedStep === 0}
                style={{
                  padding: "20px 24px", borderRadius: 22,
                  background: selectedStep === 0 ? T.mute : T.white,
                  border: `2px solid ${T.borderLight}`,
                  color: selectedStep === 0 ? T.tertiary : T.primary,
                  fontFamily: T.sans, fontSize: 14, fontWeight: 700, cursor: selectedStep === 0 ? "default" : "pointer",
                  textAlign: "left", boxShadow: selectedStep === 0 ? "none" : `0 4px 0 0 ${T.borderLight}`,
                  transition: "all 0.2s",
                }}>
                <div style={{fontSize: 11, color: T.tertiary, marginBottom: 4, fontWeight: 700, letterSpacing: "0.08em"}}>← 前のステップ</div>
                <div style={{fontSize: 14}}>{selectedStep > 0 ? j.step[selectedStep-1].title : "最初のステップです"}</div>
              </button>
              <button onClick={() => {
                  if (selectedStep < 2) {
                    setSelectedStep(selectedStep + 1);
                  } else {
                    // Complete: return to source page
                    scrollTargetRef.current = jobSource;
                    setSelectedJob(null);
                    setSelectedStep(null);
                  }
                }}
                style={{
                  padding: "20px 24px", borderRadius: 22,
                  background: selectedStep === 2 ? T.green : T.pink,
                  border: "none",
                  color: T.white,
                  fontFamily: T.sans, fontSize: 14, fontWeight: 700, cursor: "pointer",
                  textAlign: "right",
                  boxShadow: selectedStep === 2 ? "0 4px 0 0 #B89232" : "0 4px 0 0 #6BA053",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = selectedStep === 2 ? "0 2px 0 0 #B89232" : "0 2px 0 0 #6BA053"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = selectedStep === 2 ? "0 4px 0 0 #B89232" : "0 4px 0 0 #6BA053"; }}
              >
                <div style={{fontSize: 11, opacity: 0.85, marginBottom: 4, fontWeight: 700, letterSpacing: "0.08em"}}>
                  {selectedStep < 2 ? "次のステップ →" : "完了 🎉"}
                </div>
                <div style={{fontSize: 14}}>
                  {selectedStep < 2 ? j.step[selectedStep+1].title : (jobSource === "all" ? "副業一覧に戻る" : "おすすめに戻る")}
                </div>
              </button>
            </div>
          </section>
        </div>
      );
    }

    if (selectedJob) {
      const j = selectedJob;
      return (
        <div>
          <section style={{padding: "48px 24px 24px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <button onClick={()=>setSelectedJob(null)} style={{
                fontFamily: T.sans, fontSize: 14, color: T.blue, background: "none", border: "none",
                cursor: "pointer", padding: 0, marginBottom: 32, fontWeight: 500,
              }}>← 一覧に戻る</button>
            </div>
          </section>
          <section style={{padding: "0 24px 64px"}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <div style={{display: "flex", justifyContent: "center", marginBottom: 32, padding: "20px", background: I.cream, borderRadius: 28, opacity: 0.95}}>
                <Illustration name={j.ill} size={180}/>
              </div>
              <Eyebrow>{j.tags.join(" · ")}</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 24px", lineHeight: 1.05, color: T.primary}}>{j.name}</h1>
              <p style={{fontFamily: T.sans, fontSize: 19, lineHeight: 1.6, color: T.secondary, margin: "0 0 48px", letterSpacing: "-0.01em"}}>{j.desc}</p>
              <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48}}>
                {[{l:"月収目安",v:j.income},{l:"難易度",v:j.diff},{l:"必要時間",v:j.time}].map(x=>(
                  <div key={x.l} style={{background: T.mute, borderRadius: 18, padding: "24px 20px"}}>
                    <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em"}}>{x.l}</div>
                    <div style={{fontFamily: T.sans, fontSize: 17, fontWeight: 600, color: T.primary, letterSpacing: "-0.01em"}}>{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Section style={{background: T.mute, paddingTop: 80, paddingBottom: 80}}>
            <Eyebrow>3 Steps</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.1, color: T.primary}}>始め方</h2>
            <p style={{fontFamily: T.sans, fontSize: 15, color: T.secondary, margin: "0 0 32px"}}>各ステップをタップで詳しい解説が見られます</p>
            <div style={{display: "grid", gap: 16}}>
              {j.step.map((s,i)=>(
                <div key={i} onClick={()=>setSelectedStep(i)} style={{
                  background: T.white, borderRadius: 28, padding: "24px 28px",
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center",
                  border: `2px solid ${T.borderLight}`,
                  boxShadow: `0 4px 0 0 ${T.borderLight}`,
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = `0 2px 0 0 ${T.borderLight}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 0 0 ${T.borderLight}`; }}
                >
                  <div style={{
                    minWidth: 50, height: 50, borderRadius: "50%", background: T.pinkBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: T.pink, fontFamily: T.sans, fontSize: 20, fontWeight: 800,
                  }}>{i+1}</div>
                  <div>
                    <div style={{fontFamily: T.sans, fontSize: 17, lineHeight: 1.4, color: T.primary, fontWeight: 700, marginBottom: 4}}>{s.title}</div>
                    <div style={{fontFamily: T.sans, fontSize: 12, color: T.pink, fontWeight: 700}}>詳しく見る →</div>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 24, color: T.pink}}>›</div>
                </div>
              ))}
            </div>
          </Section>
          {/* おすすめのサイト */}
          {LISTINGS[j.id] && (
            <Section>
              <Eyebrow>Recommended Sites</Eyebrow>
              <h2 style={{fontFamily: T.sans, fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px", lineHeight: 1.1, color: T.primary}}>案件を探せるサイト</h2>
              <p style={{fontFamily: T.sans, fontSize: 15, color: T.secondary, margin: "0 0 32px"}}>{j.name}の案件が見つかる、おすすめのサイト3選</p>
              <div style={{display: "grid", gap: 16}}>
                {LISTINGS[j.id].map((listing, i) => (
                  <div key={i} style={{
                    background: T.white, borderRadius: 28, padding: "26px 28px",
                    border: `2px solid ${T.borderLight}`,
                    boxShadow: `0 4px 0 0 ${T.borderLight}`,
                    transition: "all 0.2s ease",
                  }}>
                    {/* Top row: number + name + badge */}
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8}}>
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap"}}>
                          <div style={{
                            minWidth: 32, height: 32, borderRadius: 10,
                            background: T.pinkBg, color: T.pink,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: T.sans, fontWeight: 800, fontSize: 14, flexShrink: 0,
                          }}>{String(i+1).padStart(2,"0")}</div>
                          <div style={{fontFamily: T.sans, fontSize: 19, fontWeight: 700, color: T.primary, letterSpacing: "-0.01em"}}>
                            {listing.name}
                          </div>
                        </div>
                        <div style={{fontFamily: T.sans, fontSize: 13, color: T.pink, fontWeight: 700, paddingLeft: 42}}>
                          {listing.tagline}
                        </div>
                      </div>
                      <span style={{
                        fontFamily: T.sans, fontSize: 11, fontWeight: 700,
                        padding: "5px 12px", borderRadius: 980,
                        background: T.greenBg, color: "#A37606",
                        whiteSpace: "nowrap", border: `1.5px solid ${T.green}40`,
                      }}>{listing.badge}</span>
                    </div>

                    {/* Description */}
                    <p style={{fontFamily: T.sans, fontSize: 14, lineHeight: 1.75, color: T.secondary, margin: "14px 0 20px", fontWeight: 500}}>
                      {listing.desc}
                    </p>

                    {/* Open site link */}
                    <div style={{display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center"}}>
                      <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "12px 22px", borderRadius: 980,
                          background: T.pink, color: T.white,
                          fontFamily: T.sans, fontSize: 14, fontWeight: 700,
                          textDecoration: "none", letterSpacing: "0.02em",
                          boxShadow: `0 4px 0 0 #6BA053`,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = "0 2px 0 0 #6BA053"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 0 0 #6BA053"; }}
                      >
                        サイトを開く
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7"/>
                          <path d="M8 7H17V16"/>
                        </svg>
                      </a>
                      {({"クラウドワークス":"crowdworks","メルカリ":"mercari","Uber Eats":"ubereats","ランサーズ":"lancers","ココナラ":"coconala","ラクマ":"rakuma","Yahoo!フリマ":"yahoofrima","シュフティ":"shufti","出前館":"demaecan","Wolt":"wolt","レバテックフリーランス":"levtech","Behance":"behance","YouTube Studio":"youtube_studio","マナリンク":"manalink","まなぶてらす":"manatera","家庭教師のトライ":"try_teacher","家庭教師のファースト":"first_teacher"})[listing.name] && (
                        <button
                          onClick={()=>setShowGuide(({"クラウドワークス":"crowdworks","メルカリ":"mercari","Uber Eats":"ubereats","ランサーズ":"lancers","ココナラ":"coconala","ラクマ":"rakuma","Yahoo!フリマ":"yahoofrima","シュフティ":"shufti","出前館":"demaecan","Wolt":"wolt","レバテックフリーランス":"levtech","Behance":"behance","YouTube Studio":"youtube_studio","マナリンク":"manalink","まなぶてらす":"manatera","家庭教師のトライ":"try_teacher","家庭教師のファースト":"first_teacher"})[listing.name])}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "12px 20px", borderRadius: 980,
                            background: T.white, color: T.primary,
                            border: `2px solid ${T.pink}`,
                            fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                            cursor: "pointer", letterSpacing: "0.02em",
                            boxShadow: `0 4px 0 0 ${T.pink}40`,
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = `0 2px 0 0 ${T.pink}40`; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 0 0 ${T.pink}40`; }}
                        >
                          📚 完全ガイドを見る
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 24, padding: "16px 20px", borderRadius: 20,
                background: T.mute, fontFamily: T.sans, fontSize: 12, color: T.tertiary, lineHeight: 1.7,
              }}>
                ※ リンク先は外部サイトに移動します。各サイトの利用は自己責任でお願いします。
              </div>
            </Section>
          )}
          <Section>
            <Card style={{background: T.orangeBg, border: "none", padding: "40px 36px"}}>
              <Eyebrow>Important</Eyebrow>
              <h3 style={{fontFamily: T.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", color: T.primary}}>税金について</h3>
              <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.6, color: T.secondary, margin: "0 0 24px"}}>{j.tax_note}</p>
              <CTA onClick={()=>setTab("tax")}>確定申告を確認する →</CTA>
            </Card>
          </Section>
        </div>
      );
    }

    if (quizResult) {
      const recs = getRecommended();
      return (
        <div>
          <section style={{padding: "100px 24px 64px", textAlign: "center", background: T.soft}}>
            <div style={{maxWidth: 760, margin: "0 auto"}}>
              <Eyebrow>Your Result</Eyebrow>
              <h1 style={{fontFamily: T.sans, fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.05, color: T.primary}}>
                あなたへの<br/>
                <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>おすすめ</span>。
              </h1>
              <p style={{fontFamily: T.sans, fontSize: 18, color: T.secondary, margin: 0}}>診断をもとに{recs.length}件をピックアップしました</p>
            </div>
          </section>
          <div id="recommended-section">
          <Section>
            <div style={{display: "grid", gap: 16}}>
              {recs.length > 0 ? recs.map((j,i)=>(
                <Card key={j.id} onClick={()=>{setJobSource("rec"); setSelectedJob(j);}} style={{padding: "24px 28px", display: "grid", gridTemplateColumns: "auto auto 1fr auto", gap: 20, alignItems: "center"}}>
                  <div style={{fontFamily: T.sans, color: T.pink, fontSize: 28, color: T.tertiary, minWidth: 40}}>{String(i+1).padStart(2,"0")}</div>
                  <div style={{background: I.cream, borderRadius: 16, padding: 8, display: "flex", flexShrink: 0}}>
                    <Illustration name={j.ill} size={64}/>
                  </div>
                  <div>
                    <h3 style={{fontFamily: T.sans, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 6px", color: T.primary}}>{j.name}</h3>
                    <div style={{fontFamily: T.sans, fontSize: 13, color: T.secondary, marginBottom: 4}}>{j.tags.join(" · ")}</div>
                    <div style={{fontFamily: T.sans, fontSize: 13, color: T.tertiary}}>{j.income} · {j.time}</div>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 22, color: T.tertiary}}>›</div>
                </Card>
              )) : (
                <Card style={{textAlign: "center", padding: "60px 32px"}}>
                  <p style={{fontFamily: T.sans, color: T.secondary}}>条件に一致する副業が見つかりませんでした。診断をやり直してみてください。</p>
                </Card>
              )}
            </div>
            <div style={{display: "flex", gap: 12, marginTop: 48, justifyContent: "center", flexWrap: "wrap"}}>
              <CTA secondary onClick={()=>{setQuizResult(null);setQuizStep(0);setQuizAns({});}}>診断をやり直す</CTA>
              <CTA onClick={()=>setTab("chat")}>AIに相談する →</CTA>
            </div>
          </Section>
          </div>
          <div id="all-jobs-section">
          <Section style={{background: T.mute}}>
            <Eyebrow>All Options</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 32px", color: T.primary}}>全副業一覧</h2>
            <div style={{display: "grid", gap: 8}}>
              {JOBS.map(j=>(
                <div key={j.id} onClick={()=>{setJobSource("all"); setSelectedJob(j);}} style={{
                  background: T.white, borderRadius: 14, padding: "14px 20px",
                  display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 16, alignItems: "center", cursor: "pointer",
                  border: `1px solid ${T.borderLight}`,
                }}>
                  <div style={{background: I.cream, borderRadius: 10, padding: 6, display: "flex"}}>
                    <Illustration name={j.ill} size={36}/>
                  </div>
                  <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 500, color: T.primary, letterSpacing: "-0.01em"}}>{j.name}</div>
                  <div style={{fontFamily: T.sans, fontSize: 13, color: T.secondary}}>{j.income}</div>
                  <div style={{fontFamily: T.sans, fontSize: 16, color: T.tertiary}}>›</div>
                </div>
              ))}
            </div>
          </Section>
          </div>
        </div>
      );
    }

    // Quiz
    const q = QUIZ[quizStep];
    return (
      <div>
        <section style={{padding: "80px 24px 56px", textAlign: "center", background: T.soft}}>
          <div style={{maxWidth: 760, margin: "0 auto"}}>
            <div style={{display: "flex", justifyContent: "center", marginBottom: 24}}>
              <HeroIllustration name="job" maxWidth={280}/>
            </div>
            <Eyebrow>Discover</Eyebrow>
            <h1 style={{fontFamily: T.sans, fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.05, color: T.primary}}>
              あなたに合う<br/>
              <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>副業を、</span>診断。
            </h1>
            <p style={{fontFamily: T.sans, fontSize: 18, color: T.secondary, margin: 0}}>3つの質問に答えるだけ</p>
          </div>
        </section>
        {/* 20万円以内ガイドへの入口 */}
        <section style={{padding: "0 24px 24px"}}>
          <div style={{maxWidth: 680, margin: "0 auto"}}>
            <div onClick={()=>setShowUnder20(true)} style={{
              background: T.greenBg, borderRadius: 24, padding: "20px 22px",
              border: `2px solid ${T.green}40`, boxShadow: `0 4px 0 0 ${T.green}30`,
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16,
              alignItems: "center", cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = `0 2px 0 0 ${T.green}30`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 0 0 ${T.green}30`; }}
            >
              <div style={{fontSize: 28, flexShrink: 0}}>🌱</div>
              <div>
                <div style={{fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.primary, marginBottom: 2}}>気軽に始めたい方はこちら</div>
                <div style={{fontFamily: T.sans, fontSize: 12, color: T.secondary, fontWeight: 500, lineHeight: 1.5}}>年間20万円以内なら確定申告ナシで副業できます</div>
              </div>
              <div style={{fontFamily: T.sans, fontSize: 22, color: T.green, fontWeight: 700}}>›</div>
            </div>
          </div>
        </section>
        <Section>
          <div style={{maxWidth: 680, margin: "0 auto"}}>
            <div style={{display: "flex", gap: 4, marginBottom: 48}}>
              {QUIZ.map((_,i)=>(
                <div key={i} style={{flex: 1, height: 3, borderRadius: 2, background: i<=quizStep?T.ink:T.borderLight, transition: "background 0.3s"}}/>
              ))}
            </div>
            <Eyebrow>Question {quizStep+1} / {QUIZ.length}</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 40px", lineHeight: 1.2, color: T.primary}}>{q.q}</h2>
            <div style={{display: "grid", gap: 10}}>
              {q.opts.map(o=>(
                <button key={o.v} onClick={()=>{
                  const a = {...quizAns,[q.id]:o.v};
                  setQuizAns(a);
                  if (quizStep < QUIZ.length-1) setQuizStep(quizStep+1);
                  else setQuizResult(a);
                }} style={{
                  padding: "24px 28px", borderRadius: 16,
                  border: `1px solid ${T.borderLight}`, background: T.white,
                  fontFamily: T.sans, fontSize: 17, fontWeight: 500,
                  cursor: "pointer", textAlign: "left", letterSpacing: "-0.01em",
                  color: T.primary, transition: "all 0.2s",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.ink;e.currentTarget.style.background=T.soft;}}
                   onMouseLeave={e=>{e.currentTarget.style.borderColor=T.borderLight;e.currentTarget.style.background=T.white;}}>
                  <span>{o.l}</span>
                  <span style={{color: T.tertiary, fontSize: 20}}>›</span>
                </button>
              ))}
            </div>
            {quizStep > 0 && (
              <button onClick={()=>setQuizStep(quizStep-1)} style={{
                marginTop: 32, fontFamily: T.sans, fontSize: 14, color: T.blue,
                background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500,
              }}>← 前の質問</button>
            )}
          </div>
        </Section>

        {/* 全副業一覧（質問の下に常時表示） */}
        <Section style={{background: T.mute}}>
          <div style={{maxWidth: 680, margin: "0 auto", textAlign: "center", marginBottom: 32}}>
            <Eyebrow>All Options</Eyebrow>
            <h2 style={{fontFamily: T.sans, fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 12px", color: T.primary}}>
              全副業一覧から選ぶ
            </h2>
            <p style={{fontFamily: T.sans, fontSize: 14, color: T.secondary, margin: 0, lineHeight: 1.85, fontWeight: 500}}>
              気になる副業が決まっている方は、こちらから直接ご覧いただけます🌱
            </p>
          </div>
          <div style={{maxWidth: 680, margin: "0 auto", display: "grid", gap: 8}}>
            {JOBS.map(j=>(
              <div key={j.id} onClick={()=>{setJobSource("all"); setSelectedJob(j);}} style={{
                background: T.white, borderRadius: 14, padding: "14px 20px",
                display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 16, alignItems: "center", cursor: "pointer",
                border: `1px solid ${T.borderLight}`, transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 12px ${T.borderLight}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{background: I.cream, borderRadius: 10, padding: 6, display: "flex"}}>
                  <Illustration name={j.ill} size={36}/>
                </div>
                <div style={{fontFamily: T.sans, fontSize: 16, fontWeight: 500, color: T.primary, letterSpacing: "-0.01em"}}>{j.name}</div>
                <div style={{fontFamily: T.sans, fontSize: 13, color: T.secondary}}>{j.income}</div>
                <div style={{fontFamily: T.sans, fontSize: 16, color: T.tertiary}}>›</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  };

  // ─── TAX ───────────────────────────────────────────
  const TaxView = () => (
    <div>
      <section style={{padding: "80px 24px 56px", textAlign: "center", background: T.soft}}>
        <div style={{maxWidth: 760, margin: "0 auto"}}>
          <div style={{display: "flex", justifyContent: "center", marginBottom: 24}}>
            <HeroIllustration name="tax" maxWidth={280}/>
          </div>
          <Eyebrow>Tax Filing</Eyebrow>
          <h1 style={{fontFamily: T.sans, fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.05, color: T.primary}}>
            確定申告、<br/>
            <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>難しくない。</span>
          </h1>
          <p style={{fontFamily: T.sans, fontSize: 18, color: T.secondary, margin: 0}}>必要かどうか、いくら払うのか、即座に判定。</p>
        </div>
      </section>
      <Section style={{paddingTop: 48, paddingBottom: 0}}>
        <div style={{display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap"}}>
          {[{k:"check",l:"申告チェック"},{k:"sim",l:"税額シミュレーター"},{k:"guide",l:"手続きガイド"}].map(n=>(
            <Pill key={n.k} active={taxView===n.k} onClick={()=>setTaxView(n.k)}>{n.l}</Pill>
          ))}
        </div>
      </Section>

      {taxView === "check" && (
        <Section style={{paddingTop: 0}}>
          <Card style={{
            background: needsFiling ? T.redBg : T.greenBg, border: "none", padding: "48px 40px", marginBottom: 16
          }}>
            <Eyebrow>{needsFiling ? "Required" : "Not Required"}</Eyebrow>
            <h3 style={{fontFamily: T.sans, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", color: T.primary, lineHeight: 1.1}}>
              {needsFiling ? "確定申告が必要です" : "確定申告は不要です"}
            </h3>
            <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 1.6, color: T.secondary, margin: 0}}>
              {needsFiling
                ? "副業の純利益が年間20万円を超えています。翌年の2月16日〜3月15日に申告が必要です。"
                : "副業の純利益が年間20万円以下のため、所得税の確定申告は不要です。住民税の申告は別途必要な場合があります。"}
            </p>
          </Card>
          <Card style={{padding: "40px"}}>
            <Eyebrow>Your Inputs</Eyebrow>
            <h3 style={{fontFamily: T.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 32px", color: T.primary}}>収入を入力</h3>
            {[
              {l:"本業の年収", val:mainIncome, set:setMainIncome, min:0, max:20000000, step:100000},
              {l:"副業の年間収入", val:sideIncome, set:setSideIncome, min:0, max:5000000, step:10000},
              {l:"副業にかかった経費", val:expenses, set:setExpenses, min:0, max:2000000, step:10000},
            ].map((f,i)=>(
              <div key={f.l} style={{paddingTop: i>0?28:0, paddingBottom: 28, borderTop: i>0?`1px solid ${T.borderLight}`:"none"}}>
                <label style={{fontFamily: T.sans, fontSize: 13, color: T.tertiary, marginBottom: 8, display: "block", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em"}}>{f.l}</label>
                <div style={{position: "relative", marginBottom: 12}}>
                  <span style={{
                    position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
                    fontFamily: T.serif, fontSize: 32, color: T.tertiary, pointerEvents: "none",
                  }}>¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={f.val.toLocaleString()}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      const num = raw === "" ? 0 : Number(raw);
                      f.set(Math.max(f.min, Math.min(f.max, num)));
                    }}
                    onFocus={e => e.target.select()}
                    style={{
                      width: "100%",
                      padding: "16px 20px 16px 48px",
                      fontFamily: T.serif, fontSize: 32, color: T.primary,
                      background: T.soft,
                      border: `2px solid ${T.borderLight}`,
                      borderRadius: 16,
                      outline: "none",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocusCapture={e => e.currentTarget.style.borderColor = T.pink}
                    onBlurCapture={e => e.currentTarget.style.borderColor = T.borderLight}
                  />
                </div>
                <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
                  {[
                    {label: "−10万", amount: -100000},
                    {label: "−1万", amount: -10000},
                    {label: "+1万", amount: 10000},
                    {label: "+10万", amount: 100000},
                  ].map(btn => (
                    <button
                      key={btn.label}
                      onClick={() => f.set(Math.max(f.min, Math.min(f.max, f.val + btn.amount)))}
                      style={{
                        flex: 1, minWidth: 70,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: T.white,
                        border: `1.5px solid ${T.borderLight}`,
                        fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                        color: btn.amount > 0 ? T.pink : T.secondary,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = T.pinkBg;
                        e.currentTarget.style.borderColor = T.pink;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = T.white;
                        e.currentTarget.style.borderColor = T.borderLight;
                      }}
                    >{btn.label}</button>
                  ))}
                </div>
                <div style={{fontFamily: T.sans, fontSize: 11, color: T.tertiary, marginTop: 10, textAlign: "center", fontWeight: 500}}>
                  金額を直接入力するか、ボタンで調整できます
                </div>
              </div>
            ))}
            <div style={{background: T.mute, borderRadius: 14, padding: "20px 24px", marginTop: 16}}>
              <div style={{display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 15, marginBottom: 10}}>
                <span style={{color: T.secondary}}>副業の純利益</span>
                <span style={{fontWeight: 600, color: T.primary}}>¥{fmt(netIncome)}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", fontFamily: T.sans, fontSize: 15, paddingTop: 14, borderTop: `1px solid ${T.borderLight}`}}>
                <span style={{color: T.secondary}}>判定</span>
                <span style={{fontWeight: 600, color: netIncome>200000?T.red:T.green}}>{netIncome>200000?"20万円超 → 必要":"20万円以下 → 不要"}</span>
              </div>
            </div>
          </Card>
        </Section>
      )}

      {taxView === "sim" && (
        <Section style={{paddingTop: 0}}>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24}}>
            {[
              {l:"副業純利益", v:netIncome, c:T.primary},
              {l:"所得税の追加", v:incomeTax, c:T.red},
              {l:"住民税の追加", v:residentTax, c:T.orange},
              {l:"追加税額合計", v:totalTax, c:T.red},
            ].map(x=>(
              <div key={x.l} style={{background: T.white, borderRadius: 18, padding: "28px 24px", border: `1px solid ${T.borderLight}`}}>
                <div style={{fontFamily: T.sans, fontSize: 11, color: T.tertiary, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em"}}>{x.l}</div>
                <div style={{fontFamily: T.serif, fontSize: 32, color: x.c, letterSpacing: "-0.02em", lineHeight: 1}}>¥{fmt(x.v)}</div>
              </div>
            ))}
          </div>
          <Card style={{padding: "40px"}}>
            <Eyebrow>Breakdown</Eyebrow>
            <h3 style={{fontFamily: T.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px", color: T.primary}}>税金の内訳</h3>
            {[
              {l:"副業収入", v:sideIncome},
              {l:"副業経費", v:-expenses},
              {l:"副業純利益", v:netIncome, bold:true},
              {l:"追加所得税", v:-incomeTax},
              {l:"追加住民税", v:-residentTax},
              {l:"手元に残る金額", v:netIncome-totalTax, bold:true, hl: true},
            ].map(x=>(
              <div key={x.l} style={{
                display: "flex", justifyContent: "space-between",
                padding: "16px 0", borderBottom: `1px solid ${T.borderLight}`,
                fontFamily: T.sans, fontSize: 16,
              }}>
                <span style={{color: x.bold?T.primary:T.secondary, fontWeight: x.bold?600:400}}>{x.l}</span>
                <span style={{fontFamily: T.serif, fontSize: 20, color: x.hl?T.green:T.primary, fontWeight: 400, letterSpacing: "-0.01em"}}>
                  {x.v<0?"−":""}¥{fmt(Math.abs(x.v))}
                </span>
              </div>
            ))}
          </Card>
          <Card style={{marginTop: 16, background: T.orangeBg, border: "none", padding: "32px 36px"}}>
            <Eyebrow>Tip</Eyebrow>
            <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 1.7, color: T.primary, margin: 0}}>
              <strong style={{fontWeight: 600}}>節税ポイント。</strong> 副業にかかった経費（PC・通信費・書籍代など）はしっかり計上しましょう。経費が増えると課税所得が減り、税額を合法的に下げられます。
            </p>
          </Card>
        </Section>
      )}

      {taxView === "guide" && (
        <Section style={{paddingTop: 0}}>
          {[
            {n:"01", t:"収入・経費を記録", d:"副業を始めたら、収入と経費をExcelやアプリで記録しておきましょう。後から集めるのは大変です。"},
            {n:"02", t:"書類を準備", d:"1月頃に源泉徴収票が届きます。副業先からの支払調書、経費のレシート、マイナンバーカードを用意。"},
            {n:"03", t:"申告書を作成", d:"国税庁「確定申告等作成コーナー」やfreee・マネーフォワードで書類を作成。質問に答えるだけで完成します。"},
            {n:"04", t:"e-Taxで電子申告", d:"マイナンバーカードがあれば自宅からオンラインで申告できます。2月16日〜3月15日が期間です。"},
            {n:"05", t:"納税・還付", d:"追加税金は3月15日までに納付。還付がある場合は1〜2ヶ月で指定口座に振り込まれます。"},
          ].map((s,i)=>(
            <div key={s.n} style={{
              padding: "32px 36px", background: T.white, borderRadius: 22,
              border: `1px solid ${T.borderLight}`, marginBottom: 12,
              display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline"
            }}>
              <div style={{fontFamily: T.sans, color: T.pink, fontSize: 40, color: T.blue, minWidth: 60}}>{s.n}</div>
              <div>
                <h4 style={{fontFamily: T.sans, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px", color: T.primary}}>{s.t}</h4>
                <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.65, color: T.secondary, margin: 0, letterSpacing: "-0.01em"}}>{s.d}</p>
              </div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );

  // ─── NISA ──────────────────────────────────────────
  const NisaView = () => {
    const maxTotal = Math.max(...nisaData.pts.map(p=>p.total), 1);
    const w = 600, h = 220;
    const points = nisaData.pts.map((p, i) => ({
      x: (i / (nisaData.pts.length - 1)) * w,
      y: h - (p.total / maxTotal) * h,
      invY: h - (p.inv / maxTotal) * h,
      ...p
    }));
    const linePath = points.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;
    const invLinePath = points.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.invY}`).join(" ");

    return (
      <div>
        <section style={{padding: "80px 24px 56px", textAlign: "center", background: T.soft}}>
          <div style={{maxWidth: 760, margin: "0 auto"}}>
            <div style={{display: "flex", justifyContent: "center", marginBottom: 24}}>
              <HeroIllustration name="nisa" maxWidth={280}/>
            </div>
            <Eyebrow>NISA</Eyebrow>
            <h1 style={{fontFamily: T.sans, fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.05, color: T.primary}}>
              時間を、<br/>
              <span style={{fontFamily: T.sans, color: T.pink, fontWeight: 400}}>味方に。</span>
            </h1>
            <p style={{fontFamily: T.sans, fontSize: 18, color: T.secondary, margin: 0}}>非課税の力で、お金を育てる。</p>
          </div>
        </section>
        <Section style={{paddingTop: 48, paddingBottom: 0}}>
          <div style={{display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap"}}>
            {[{k:"sim",l:"シミュレーター"},{k:"what",l:"NISAとは？"},{k:"start",l:"始め方"}].map(n=>(
              <Pill key={n.k} active={nisaTab===n.k} onClick={()=>setNisaTab(n.k)}>{n.l}</Pill>
            ))}
          </div>
        </Section>

        {nisaTab === "sim" && (
          <Section style={{paddingTop: 0}}>
            {/* Result Card */}
            <Card style={{padding: "40px 32px", marginBottom: 24, background: `linear-gradient(135deg, ${T.pinkBg} 0%, ${T.greenBg} 100%)`, color: T.primary, border: `2px solid ${T.borderLight}`}}>
              <Eyebrow>{years} years from now</Eyebrow>
              <div style={{display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32, flexWrap: "wrap"}}>
                <div style={{fontFamily: T.sans, fontWeight: 800, fontSize: "clamp(48px, 9vw, 84px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: T.pink}}>
                  ¥{fmt(nisaData.total)}
                </div>
              </div>
              {/* Chart */}
              <div style={{margin: "0 -8px", background: T.white, borderRadius: 24, padding: 20}}>
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{width: "100%", height: 220}}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={T.green} stopOpacity="0.5"/>
                      <stop offset="100%" stopColor={T.green} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#areaGrad)"/>
                  <path d={invLinePath} fill="none" stroke={T.tertiary} strokeWidth="2" strokeDasharray="4 4"/>
                  <path d={linePath} fill="none" stroke={T.green} strokeWidth="3" strokeLinecap="round"/>
                  {points.filter((_,i)=>i===points.length-1).map((p,i)=>(
                    <circle key={i} cx={p.x} cy={p.y} r="6" fill={T.green} stroke={T.white} strokeWidth="3"/>
                  ))}
                </svg>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: T.sans, fontSize: 12, color: T.tertiary, fontWeight: 600}}>
                  <span>今日</span>
                  <span>{years}年後</span>
                </div>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 24}}>
                {[
                  {l:"投資元本", v: fmt(nisaData.invested), c: T.primary},
                  {l:"運用益", v: "+"+fmt(nisaData.gain), c: T.green},
                  {l:"節税額", v: "+"+fmt(taxSaved), c: T.yellow},
                ].map(x=>(
                  <div key={x.l} style={{background: T.white, borderRadius: 18, padding: "14px 10px", textAlign: "center"}}>
                    <div style={{fontFamily: T.sans, fontSize: 11, color: T.tertiary, marginBottom: 6, fontWeight: 700, letterSpacing: "0.04em"}}>{x.l}</div>
                    <div style={{fontFamily: T.sans, fontSize: 16, color: x.c, fontWeight: 800}}>¥{x.v}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Controls */}
            <Card style={{padding: "40px"}}>
              <div style={{marginBottom: 32}}>
                <Eyebrow>Monthly Investment</Eyebrow>
                <div style={{position: "relative", marginTop: 12, marginBottom: 12}}>
                  <span style={{
                    position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
                    fontFamily: T.serif, fontSize: 36, color: T.tertiary, pointerEvents: "none",
                  }}>¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthly.toLocaleString()}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^\d]/g, "");
                      const num = raw === "" ? 0 : Number(raw);
                      setMonthly(Math.max(0, Math.min(1000000, num)));
                    }}
                    onFocus={e => e.target.select()}
                    style={{
                      width: "100%",
                      padding: "20px 20px 20px 52px",
                      fontFamily: T.serif, fontSize: 36, color: T.primary,
                      background: T.soft,
                      border: `2px solid ${T.borderLight}`,
                      borderRadius: 16,
                      outline: "none",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocusCapture={e => e.currentTarget.style.borderColor = T.pink}
                    onBlurCapture={e => e.currentTarget.style.borderColor = T.borderLight}
                  />
                </div>
                <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
                  {[
                    {label: "−1万", amount: -10000},
                    {label: "−5千", amount: -5000},
                    {label: "+5千", amount: 5000},
                    {label: "+1万", amount: 10000},
                  ].map(btn => (
                    <button
                      key={btn.label}
                      onClick={() => setMonthly(Math.max(0, Math.min(1000000, monthly + btn.amount)))}
                      style={{
                        flex: 1, minWidth: 70,
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: T.white,
                        border: `1.5px solid ${T.borderLight}`,
                        fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                        color: btn.amount > 0 ? T.pink : T.secondary,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = T.pinkBg;
                        e.currentTarget.style.borderColor = T.pink;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = T.white;
                        e.currentTarget.style.borderColor = T.borderLight;
                      }}
                    >{btn.label}</button>
                  ))}
                </div>
                <div style={{fontFamily: T.sans, fontSize: 11, color: T.tertiary, marginTop: 10, textAlign: "center", fontWeight: 500}}>
                  金額を直接入力するか、ボタンで調整できます
                </div>
              </div>
              <div style={{marginBottom: 32, paddingTop: 24, borderTop: `1px solid ${T.borderLight}`}}>
                <Eyebrow>Annual Return</Eyebrow>
                <div style={{display: "flex", gap: 8}}>
                  {[3,5,7].map(r=>(
                    <button key={r} onClick={()=>setReturnRate(r)} style={{
                      flex: 1, padding: "16px", borderRadius: 12,
                      border: `1px solid ${returnRate===r?T.ink:T.borderLight}`,
                      background: returnRate===r?T.ink:T.white,
                      color: returnRate===r?T.white:T.primary,
                      fontFamily: T.sans, fontSize: 17, fontWeight: 600,
                      cursor: "pointer", letterSpacing: "-0.01em",
                    }}>{r}%</button>
                  ))}
                </div>
              </div>
              <div style={{paddingTop: 24, borderTop: `1px solid ${T.borderLight}`}}>
                <Eyebrow>Period</Eyebrow>
                <div style={{display: "flex", gap: 8}}>
                  {[10,20,30].map(y=>(
                    <button key={y} onClick={()=>setYears(y)} style={{
                      flex: 1, padding: "16px", borderRadius: 12,
                      border: `1px solid ${years===y?T.ink:T.borderLight}`,
                      background: years===y?T.ink:T.white,
                      color: years===y?T.white:T.primary,
                      fontFamily: T.sans, fontSize: 17, fontWeight: 600,
                      cursor: "pointer", letterSpacing: "-0.01em",
                    }}>{y}年</button>
                  ))}
                </div>
              </div>
            </Card>
          </Section>
        )}

        {nisaTab === "what" && (
          <Section style={{paddingTop: 0}}>
            {[
              {n:"01", title:"NISAとは何か", body:"通常、株や投資信託の利益には約20%の税金がかかります。NISAはその税金が0円になる特別な口座のことです。得した分がそのまま手元に残ります。"},
              {n:"02", title:"なぜ「今すぐ」なのか", body:"投資は時間が最大の武器です。同じ月3万円でも、30歳開始と40歳開始では、60歳時点で数百万円の差が生まれることもあります。"},
              {n:"03", title:"リスクは管理できる", body:"短期では値動きしますが、長期（10〜20年）でインデックスファンドに積み立てると、歴史的に損失となるケースは稀です。少額から始めるのが鉄則。"},
              {n:"04", title:"何を買えばいい？", body:"初心者には「全世界株式インデックスファンド（オルカン）」や「S&P500インデックスファンド」が広く推奨されています。世界中に自動で分散投資できます。"},
            ].map(c=>(
              <div key={c.n} style={{
                padding: "40px 36px", background: T.white, borderRadius: 22,
                border: `1px solid ${T.borderLight}`, marginBottom: 12,
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline"
              }}>
                <div style={{fontFamily: T.sans, color: T.pink, fontSize: 40, color: T.green, minWidth: 60}}>{c.n}</div>
                <div>
                  <h3 style={{fontFamily: T.sans, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 12px", color: T.primary}}>{c.title}</h3>
                  <p style={{fontFamily: T.sans, fontSize: 16, lineHeight: 1.7, color: T.secondary, margin: 0, letterSpacing: "-0.01em"}}>{c.body}</p>
                </div>
              </div>
            ))}
          </Section>
        )}

        {nisaTab === "start" && (
          <Section style={{paddingTop: 0}}>
            {[
              {n:"01", t:"証券会社を選ぶ", d:"SBI証券・楽天証券・マネックス証券などのネット証券が手数料が安く、NISA対応も充実しています。"},
              {n:"02", t:"口座を開設", d:"Webサイトから申し込み。本人確認書類をスマホで撮影するだけ。1〜2週間で開設できます。"},
              {n:"03", t:"NISA口座を申請", d:"証券口座が開設できたら、続けてNISA口座を申請します。"},
              {n:"04", t:"積立設定をする", d:"どのファンドを月いくら積み立てるか設定。「全世界株式」が初心者に多い選択です。"},
              {n:"05", t:"あとは放置でOK", d:"設定後は毎月自動で積み立てされます。日々の値動きを気にせず、長期で続けることが大切です。"},
            ].map(s=>(
              <div key={s.n} style={{
                padding: "32px 36px", background: T.white, borderRadius: 22,
                border: `1px solid ${T.borderLight}`, marginBottom: 12,
                display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline"
              }}>
                <div style={{fontFamily: T.sans, color: T.pink, fontSize: 40, color: T.green, minWidth: 60}}>{s.n}</div>
                <div>
                  <h4 style={{fontFamily: T.sans, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px", color: T.primary}}>{s.t}</h4>
                  <p style={{fontFamily: T.sans, fontSize: 15, lineHeight: 1.65, color: T.secondary, margin: 0, letterSpacing: "-0.01em"}}>{s.d}</p>
                </div>
              </div>
            ))}
          </Section>
        )}
      </div>
    );
  };

  // ─── CHAT ──────────────────────────────────────────
  const ChatView = () => (
    <div>
      <section style={{padding: "60px 24px 24px", textAlign: "center", background: T.pinkSoft}}>
        <div style={{maxWidth: 760, margin: "0 auto"}}>
          <div style={{display: "flex", justifyContent: "center", marginBottom: 16}}>
            <Character pose={chatLoading ? "think" : "talk"} size={130}/>
          </div>
          <Eyebrow>ナルとお話</Eyebrow>
          <h1 style={{fontFamily: T.sans, fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 12px", lineHeight: 1.2, color: T.primary}}>
            なんでも、<br/>
            <span style={{color: T.pink}}>聞いていいよ。</span>
          </h1>
          <p style={{fontFamily: T.sans, fontSize: 14, color: T.secondary, margin: 0, fontWeight: 500}}>副業・確定申告・NISAのことなら、何でも答えるよ🌱</p>
        </div>
      </section>
      <Section style={{paddingTop: 32}}>
        <div style={{maxWidth: 720, margin: "0 auto"}}>
          <div style={{minHeight: 320, marginBottom: 24, display: "flex", flexDirection: "column", gap: 16, padding: "8px 4px"}}>
            {msgs.map((m,i)=>(
              m.role === "user" ? (
                <div key={i} style={{display: "flex", justifyContent: "flex-end"}}>
                  <div style={{
                    maxWidth: "78%", padding: "14px 20px",
                    borderRadius: "22px 22px 6px 22px",
                    background: T.pink, color: T.white,
                    fontFamily: T.sans, fontSize: 15, lineHeight: 1.6, fontWeight: 500,
                  }}>{m.content}</div>
                </div>
              ) : (
                <div key={i} style={{display: "flex", gap: 10, alignItems: "flex-end"}}>
                  <div style={{flexShrink: 0, marginBottom: -4}}>
                    <Character pose="default" size={48}/>
                  </div>
                  <div style={{
                    maxWidth: "78%", padding: "14px 18px",
                    borderRadius: "22px 22px 22px 6px",
                    background: T.white,
                    border: `2px solid ${T.borderLight}`,
                    color: T.primary,
                    fontFamily: T.sans, fontSize: 15, lineHeight: 1.7, fontWeight: 500,
                    position: "relative",
                  }}>{m.content}</div>
                </div>
              )
            ))}
            {chatLoading && (
              <div style={{display: "flex", gap: 10, alignItems: "flex-end"}}>
                <div style={{flexShrink: 0, marginBottom: -4}}>
                  <Character pose="think" size={48}/>
                </div>
                <div style={{
                  padding: "14px 18px", borderRadius: "22px 22px 22px 6px",
                  background: T.white, border: `2px solid ${T.borderLight}`,
                  fontFamily: T.sans, fontSize: 14, color: T.tertiary, fontWeight: 500,
                }}>
                  考えてるよ <span style={{animation: "blink 1.4s infinite"}}>…</span>
                </div>
              </div>
            )}
            <div ref={chatEnd}/>
          </div>
          <div style={{display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, justifyContent: "center"}}>
            {["副業で年20万超えたら？","NISAは何歳から？","確定申告を忘れたら？","副業がバレない方法"].map(q=>(
              <button key={q} onClick={()=>setChatInput(q)} style={{
                fontFamily: T.sans, fontSize: 13, padding: "8px 16px", borderRadius: 980,
                border: `2px solid ${T.borderLight}`, background: T.white, color: T.secondary,
                cursor: "pointer", letterSpacing: "0", fontWeight: 600,
              }}>{q}</button>
            ))}
          </div>
          <div style={{
            display: "flex", gap: 10, padding: 6, background: T.white, borderRadius: 980,
            border: `2px solid ${T.borderLight}`, boxShadow: `0 4px 0 0 ${T.borderLight}`,
          }}>
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}
              placeholder="ナルに質問してみよう..."
              style={{
                flex: 1, padding: "12px 20px", borderRadius: 980, border: "none",
                background: "transparent", fontFamily: T.sans, fontSize: 15,
                color: T.primary, outline: "none", fontWeight: 500,
              }}/>
            <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{
              padding: "0 22px", borderRadius: 980,
              background: chatInput.trim()&&!chatLoading?T.pink:T.borderLight,
              color: chatInput.trim()&&!chatLoading?T.white:T.tertiary,
              border: "none", fontFamily: T.sans, fontSize: 14, fontWeight: 800,
              cursor: chatInput.trim()&&!chatLoading?"pointer":"default",
            }}>送信</button>
          </div>
        </div>
      </Section>
    </div>
  );

  // ─── RENDER ──────────────────────────────────────────
  return (
    <div style={{fontFamily: T.sans, background: T.soft, minHeight: "100vh", color: T.primary, paddingTop: 64, paddingBottom: isMobile ? 76 : 0}}>
      {/* Top Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 64, zIndex: 100,
        background: "rgba(255, 249, 242, 0.92)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: `2px solid ${T.borderLight}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{maxWidth: 980, width: "100%", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <button onClick={()=>{setTab("home"); setQuizResult(null); setQuizStep(0); setSelectedJob(null); setSelectedStep(null); setShowUnder20(false); setShowGuide(null);}} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: T.sans, fontWeight: 800, fontSize: 20, color: T.pink,
            letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{display: "inline-flex", alignItems: "center"}}>
              <Character pose="default" size={36}/>
            </div>
            <span style={{color: T.primary}}>Money<span style={{color: T.pink}}>Guide</span></span>
          </button>
          {/* PC版のみ：上部にタブを表示 */}
          {!isMobile && (
            <div style={{display: "flex", gap: 4}}>
              {TABS.map(t=>(
                <button key={t.id} onClick={()=>{setTab(t.id); if(t.id!=="job"){setQuizResult(null); setQuizStep(0); setSelectedJob(null); setSelectedStep(null); setShowUnder20(false); setShowGuide(null);}}}
                  style={{
                    padding: "8px 16px", borderRadius: 980,
                    background: tab===t.id?T.pink:"transparent",
                    color: tab===t.id?T.white:T.primary,
                    border: "none", cursor: "pointer",
                    fontFamily: T.sans, fontSize: 13, fontWeight: 700,
                    letterSpacing: "0.02em", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                  <Icon name={t.icon} size={16} strokeWidth={2}/>
                  {t.l}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      {tab==="home" && <HomeView/>}
      {tab==="job" && <JobView/>}
      {tab==="tax" && <TaxView/>}
      {tab==="nisa" && <NisaView/>}
      {tab==="chat" && <ChatView/>}

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: 68, zIndex: 100,
          background: "rgba(255, 249, 242, 0.96)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderTop: `2px solid ${T.borderLight}`,
          display: "flex", alignItems: "stretch",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>
          {TABS.map(t=>{
            const active = tab===t.id;
            return (
              <button
                key={t.id}
                onClick={()=>{
                  setTab(t.id);
                  if(t.id!=="job"){
                    setQuizResult(null); setQuizStep(0); setSelectedJob(null);
                    setSelectedStep(null); setShowUnder20(false); setShowGuide(null);
                  }
                  // ページトップにスクロール
                  window.scrollTo({top: 0, behavior: "smooth"});
                }}
                style={{
                  flex: 1,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 2,
                  background: "transparent", border: "none", cursor: "pointer",
                  padding: "8px 4px",
                  transition: "all 0.2s",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div style={{
                  transition: "transform 0.2s",
                  transform: active ? "scale(1.15)" : "scale(1)",
                  opacity: active ? 1 : 0.55,
                  color: active ? T.pink : T.tertiary,
                  display: "flex",
                }}>
                  <Icon name={t.icon} size={24} strokeWidth={active ? 2.2 : 2}/>
                </div>
                <div style={{
                  fontFamily: T.sans, fontSize: 10, fontWeight: 700,
                  color: active ? T.pink : T.tertiary,
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}>{t.l}</div>
                {active && (
                  <div style={{
                    position: "absolute", top: 0, height: 3, width: 24,
                    background: T.pink, borderRadius: "0 0 3px 3px",
                  }}/>
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* Footer */}
      <footer style={{padding: "48px 24px", borderTop: `1px solid ${T.borderLight}`, background: T.soft}}>
        <div style={{maxWidth: 980, margin: "0 auto", textAlign: "center"}}>
          <div style={{fontFamily: T.sans, color: T.pink, fontSize: 18, color: T.tertiary, marginBottom: 8}}>MoneyGuide</div>
          <div style={{fontFamily: T.sans, fontSize: 12, color: T.tertiary, letterSpacing: "-0.01em"}}>
            本サービスは情報提供を目的としており、税務・投資の最終判断は専門家へご相談ください。
          </div>
        </div>
      </footer>
    </div>
  );
}
