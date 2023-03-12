<template>
	<div class="main-page">
		<div class="homepage-view">
			<div class="curve-background">
				<div class="container text-right">
					<div
						class="advertise d-flex w-100 align-items-baseline justify-content-center"
					>
						<div class="title">
							جستجو ، مقایسه و
							<h2 class="pl-1">
								رزرو هتل
							</h2>
						</div>
						<span>از میان فروشندگان مختلف </span>
					</div>
				</div>
				<div class="search-container">
					<search-segment />
					<hotel-search
						ref="SearchHotel"
						:check-in-date="new Date().toDateString()"
						:check-out-date="
							new Date(new Date().getTime() + 86400000).toDateString()
						"
						:disabled="false"
						:show-currency="true"
						:show-icon-edit="false"
						:city-hotel-list="cityHotelList"
						:home-search="true"
						hotel-title="جستجوی مقصد(شهر/هتل)"
						@searchHotels="searchHotels"
					/>
				</div>
				<div
					class="container overflow-auto seller-logo-box"
				>
					<div class="row seller-logo-row" style="text-align: center">
						<div
							v-for="(sellerLogo, index) in sellersLogoArray"
							:key="index"
							class="seller-logo-wrapper"
						>
							<div :class="sellerLogo" class="sellers-logo" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container cities-list">
			<div class="d-flex align-items-center">
				<h1 class="main-page__title">
					هتل‌های ایران
				</h1>
				<div class="main-page__line" />
			</div>
			<div class="cities-list__box d-flex flex-wrap">
				<div v-for="(city, i) in citiesList" :key="i" class="d-flex flex-column cities-list__box__row">
					<div v-for="(item) in city" :key="item.id">
						<div>
							<nuxt-link :to="'/' + item.id">
								هتل های	{{ item.label }}
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container seo-content text-right">
			برخی از هتل های ایران ویژگی‌های خاصی دارد که باعث شده‌اند برخی از آن‌ها جاذبه گردشگری محسوب شوند. برخی از این هتل‌ها دارای معماری کاملاً ویژه‌ای هستند و در طراحی آن‌ها از ویژگی‌های معماری اصیل همان منطقه الهام گرفته شده است و برخی دیگر هم در موقعیت مکانی منحصربه‌فردی قرار گرفته‌اند. تعدادی از این هتل‌ها هم کاملاً لوکس هستند. در میان این هتل‌ها چند هتل هم هستند که تمام این ویژگی‌ها را با هم دارند. در ادامه با تعددادی از خاص‌ترین و لوکس‌ترین هتل های ایران آشنا می‌شویم، پس همراه ما باشید.
			<h2>استانداردهای رتبه بندی هتل های ایران</h2>
			<p>
				پس از آنکه به خاص‌ترین و بهترین هتل‌های ایران بپردازیم، اجازه دهید تا با استاندار رتبه‌بندی هتل های ایران آشنا شویم. اصلی‌ترین معیار رتبه‌بندی هتل های ایران و سایر جهان بر اساس تعداد ستاره است و هتل‌ها بر اساس سطح کیفی دارای یک تا پنج ستاره هستند.
				<br>
				هتل‌های تک‌ستاره دارای حداقل سطح کیفی خدمات هستند و اتاق‌های آن‌ها دارای حداقل امکانات رفاهی لازم به همراه سرویس بهداشتی اختصاصی هستند در این هتل‌ها صبحانه، ناهار و شام به صورت سلف‌سرویس و منو آزاد نیست و به صورت محدود می‌شود.
				<br>
				از مزایای هتل‌های دو ستاره نسبت به هتل‌های تک‌ستاره می‌توان به موارد زیر اشاره کرد:
				<ul>
					<li>
						خدمات خانه‌داری
					</li>
					<li>
						وجود مبلمان با کیفیت در اتاق
					</li>
					<li>
						دکوراسیون منظم و هماهنگ
					</li>
					<li>
						ارائه خدمات توسط پرسنل آموزش‌دیده
					</li>
					<li>
						اتاق‌هایی با فضای تمیزتر و بزرگ‌تر
					</li>
					<li>
						ارائه صبحانه سلف‌سرویس
					</li>
					<li>
						نزدیکی بیشتر به جاذبه‌های گردشگری شهر
					</li>
				</ul>
			</p>
			<p>
				هتل‌های سه ستاره دارای فضای بزرگ‌تر و مجلل‌تری نسبت به هتل‌های دو ستاره هستند و رستوران آن‌ها دارای سطح بالاتری است. درضمن این هتل‌ها ملزم به پذیرش ۲۴ ساعته هستند. از دیگر مزایای این هتل‌ها نسبت به هتل‌های رده‌پایین‌تر می‌توان به امکان کنترل درجه دما در اتاق، برخورداری از سیستم روشنایی هوشمند، برخی از امکانات تفریحی مانند سالن بیلیارد و ارائه خدمات باربری و حمل چمدان اشاره کرد.
				<br>
				در هتل‌های چهار ستاره که معمولا جزو هتل‌های خوب محسوب می‌شوند، خدمات‌رسانی به مسافران در سطح بسیار خوبی انجام می‌شود و بخش‌های مختلف هتل دکوراسیون جذابی دارند. درضمن اتاق‌های هتل نیز معمولاً دارای سیستم‌های هوشمند نورپردازی و سرمایش و گرمایش هستند. وجود استخر سونا جکوزی، سالن بدن‌سازی و رستوران‌های مجلل گسترده از غذاها از دیگر ویژگی‌های شاخص هتل‌های چهار ستاره هستند.
				<br>
				هتل‌های ۵ ستاره دارای بالاترین سطح کیفی هستند و اتاق‌های آن‌ها دارای لوازم و اسباب و اثاثیه لوکس و گران‌قیمت هستند و حتی از امکاناتی مثل جکوزی اختصاصی نیز برخوردار هستند. از دیگر نقاط قوت برجسته هتل‌های ۵ ستاره می‌توان به ارائه خدمات تشریفاتی مثل استقبال از مسافر از فرودگاه، وجود رستوران‌های خاص و منحصربه‌فرد در هتل، برخورداری از لابی بسیار زیبا و مجلل چشم‌اندازهای زیبا و خیره‌کننده به محیط‌های اطراف اشاره کرد.
			</p>
			<h2 class="seo-content-heading">
				معرفی هتل های خاص ایران
			</h2>
			<p>
				در ادامه با بهترین هتل‌های خاص ایران، ازجمله هتل‌های لاکچری و لوکس‌ترین هتل های ایران، بهترین هتل‌های کویری و جنگلی و قدیمی‌ترین هتل‌های سنتی ایران آشنا می‌شویم. بدون تردید می‌توان گفت هتل پنج ستاره صخره‌ای لاله کندوان خاص‌ترین هتل ایران است. این هتل در دل صخره‌ها و با تراشیدن آن‌ها ساخته شده و از مصالحی در ساخت آن استفاده نشده است. معماری این <a href="https://radar361.com/osku/laleh-kandovan/" target="_blank">هتل لاله کندوان</a> با الهام از خانه‌های روستای کندوان که هتل در آن قرار دارد، طراحی شده است.
				<br>
				خانه‌های مخروطی شکل این روستا از تراشیدن صخره‌های سخت روستا به وجود آمده‌اند و در بنای اصلی آن‌ها هیچ ماده‌ای به جزء سنگ دیده نمی‌شود. اتاق‌های هتل لاله کندوان نیز مخروطی و مجهز به جکوزی اختصاصی هستند. با اقامت در این هتل می‌توانید رابطه خاصی با طبیعت برقرار کنید و تصور می‌کنید در حال اقامت در غارهایی با امکانات لوکس هستید!
				<br>
				البته ساختمان هتل به دلیل حفظ ساختار طبیعی‌اش ساختاری پلکانی دارد و فاقد آسانسور است. برای رسیدن به اتاق‌های بالای این هتل باید پله‌های متعددی را طی کنید، بنابراین هتل لاله کندوان برای افراد معلول و سالمند مناسب نیست.
				<br>
				هتل پنج ستاره ترنج کیش یکی دیگر از هتل‌های خاص ایران است برخی از اتاق‌های آن روی دریا قرار دارند و با اقامت در آن‌ها می‌توانید، از تماشای آب زلال دریای اطراف جزیره کیش و زیباترین چشم‌انداز غروب دریای کیش نهایت لذت را ببرید.
				<br>
				در ضمن قسمتی از کف اتاق‌های دریای این هتل شیشه‌ای است که از آن قسمت می‌توانید آکواریومی طبیعی با ماهی‌های رنگارنگ در حال شنا در آب شفاف را ببینید و ساعت‌ها غرق در این منظره شوید. <a href="https://radar361.com/kish/toranj/" target="_blank">هتل ترنج کیش</a> که یکی از هتل های لاکچری ایران و یکی از بهترین هتل های ایران نیز محسوب می‌شود، دارای امکانات خاص دیگری همچون رستوران و باشگاه با کف شیشه‌ای و کافی‌شاپ مجلل در بام هتل است.
				<br>
				هتل چهاره ستاره اسپیناس آستارا که در قلب پناهگاه حیات‌وحش لوندویل واقع شده است، در کنار تالاب زیبای استیل آستارا قرار دارد و چشم‌انداز بسیار زیبایی به این دریاچه دارد. با اقامت در هتل که یکی از هتل‌های خوب تهران به‌شمار می‌رود، می‌توانید با قایق‌سواری در دریاچه که در دل جنگل‌های انبوه قرار دارد و ملاقات با قوهای ساکنان با آرامش وصف‌ناپذیری را تجربه کنید. معماری تاریخی این هتل نیز واقعاً جذاب و به سبک کاخ دوران پهلوی است.
			</p>
			<h3 class="seo-content-heading">
				هتل‌های عجیب و غریب ایران
			</h3>
			<p>
				بعد از هتل صخره‌ای لاله کندوان، بدون تردید هتل چهاره ستاره کپری قلعه گنج کرمان را می‌توان یکی از عجیب‌ترین و در عین حال یکی از بهترین هتل های ایران دانست؛ زیرا اتاق‌ها و سایر قسمت‌های این هتل لوکس شبیه کپرها که نماد فقر مطلق در منطقه اطراف هتل هستند، ساخته‌ شده‌اند. با اقامت در این هتل خاص می‌توانید از دیدن آسمان کویر شب و همچنین غذاهای محلی منطقه لذت ببرید و از دیدن آداب ‌و رسوم مراسم مردم منطقه نیز آشنا شوید.
			</p>
			<h2 class="seo-content-heading">
				هتل های کویری ایران
			</h2>
			<p>
				هتل سه ستاره کویری بالی مصر درخور و بیابانک، یکی از جذاب‌ترین هتل‌های کویری ایران محسوب می‌شود. اتاق‌های سنتی کاهگلی هتل و سایر قسمت‌های هتل دارای معماری ساده و کاملاً اصیل مناطق کویری ایران هستند اسباب و اثاثیه اتاق نیز کاملاً مطابق با دکوراسیون سنتی منازل انتخاب شده‌اند.
				<br>
				با اقامت در این هتل می‌توانید از تماشای آسمان کویری، چشیدن طعم غذاهای محلی و تفریحات کویری مانند شترسواری و سافاری نیز لذت ببرید. از دیگر هتل‌های کویری ایران می‌توان اشاره کرد به:
			</p>
			<ul>
				<li>هتل سه ستاره تی دا درخوروبیابانک</li>
				<li>هتل سنتی یه تا در خوروبیابانک</li>
				<li>هتل ستاره کویر در گرمسار</li>
				<li>هتل سنتی یلو در ابوزیدآباد</li>
			</ul>
			<h2 class="seo-content-heading">
				هتل های جنگلی ایران
			</h2>
			<p>
				هتل چهارستاره بام رامسر بهترین و خاص‌ترین هتل در میان هتل‌های جنگلی ایران است که در مجموعه تله‌کابین رامسر ساخته شده است و تنها می‌توانید از طریق تله‌کابین رامسر خود را به این هتل برسانید. برخی از واحدهای اقامتی هتل به شکل کلبه‌های جنگلی قدیمی طراحی و ساخته ‌شده‌اند و هر یک از آن‌ها دارای تم و دکوراسیون خاصی هستند.
				<br>
				با اقامت در این هتل می‌توانید از یک طرف از مناظر بکر جنگلی لذت ببرید و از سوی دیگر نظاره‌گر منظره دیدنی دریا از ارتفاع باشید. همچنین مسئولان مجموعه تله‌کابین رامسر امکان دسترسی راحت مهمانان هتل به رستوران سنتی و سایر تفریحات مثل شهربازی و کارتینگ را فراهم کرده‌اند. تفریحات دریایی نظیر جت اسکی، شاتل، اسکی روی آب، قایق‌سواری و پاراسل از دیگر تفریحات مجموعه تله‌کابین رامسر هستند.
				<br>
				هتل جنگلی چهاره ستاره چالدره با کلبه‌های جنگلی در دل جنگل واقع در جاده دوهزار، یکی دیگر از بهترین هتل‌های جنگلی ایران است که در آن خبری از اینترنت و تلویزیون نیست و می‌توانید از اقامت در محیطی که در آن تنها صدای پرندگان و رودخانه را می‌شنوید، آرامش بی‌نظیری را تجربه کنید بدون تردید هتل چالدره هم درصدر هتل های خوب ایران قرار دارد.
			</p>
			<h2>لوکس ترین هتل های ایران</h2>
			<p>
				هتل ترنج کیش که قبلاً با آن آشنا شدیم یکی از بهترین هتل های لاکچری ایران محسوب می‌شود. علاوه بر هتل ترنج کیش هتل پنج ستاره داریوش کیش با سبک معماری ایران باستان و تخت جمشید یکی از بهترین هتل های ایران محسوب می‌شود. این هتل با هدف ایجاد نمادی از دوران شکوه ایران در دوران سلسله هخامنشی و بازسازی تخت جمشید، ایجاد شده است. از بخش های ویژه این هتل می‌توان به باغ زیبا وهمچنین  استخر روباز باز آن چشم‌انداز خلیج فارس اشاره کرد.
				<br>
				ستون‌های بلند، سرستون‌ها، نقش برجسته ها و نقش و نگارهایی که در تمام بخش‌های هتل داریوش و حتی اتاق‌ها دیده می‌شود، هر نگاهی را به خود خیره می‌کند. تمام عناصر معماری این هتل درست شبیه نمونه‌های موجود در تخت جمشید طراحی و ساخته‌ شده‌اند؛ با اقامت در این هتل می‌توانید از  قدم زدن در فضای آن، صرف غذا در رستوران‌های مجلل و زندگی به سبک شاهان هخامنشی را تجربه کنید.
				<br>
				<a href="https://radar361.com/tehran/espinas-palas/" terget="_blank">هتل اسپیناس پالاس تهران</a> یکی دیگر از هتل‌های پنج ستاره فوق لوکس کشور است اتاق‌های این هتل دارای دکوراسیون فوق‌العاده شیک، جذاب و مدرنی هستند و می‌توانید در آن از ماساژ تایلندی لذت ببرید. رستوران سنتی هتل با سبک معماری سنتی شبیه به معماری اصیل یزد و رستوران مدیترانه‌ای هتل آماده پذیرایی از مهمانان با بهترین غذاها هستند.
				<br>
				<a href="https://radar361.com/mashhad/darvishi/" target="_blank">هتل درویشی مشهد</a> با معماری خیره‌کننده خود که تلفیقی از سبک‌های معماری مصری، چینی و عربی هندی و رومی است، حقیقتاً در صدر بهترین هتل های لاکچری ایران قرار دارد. در این هتل می‌توانید از بهترین اسپای مشهد لذت ببرید و با استفاده از خدماتی نظیر حمام سنتی، سنگ رودخانه و دکترفیش به آرامش جسمی و روحی بی‌نظیری دست پیدا کنید.
				<br>
				دکوراسیون بی‌نظیر و فوق‌العاده شیک هتل نیز شما را مجذوب خود می‌کند. در ضمن در این هتل می‌توانید از انواع ماساژها لذت ببرید، از ماساژ تایلندی و سوئدی گرفته تا ماساژ سر و صورت و پا و سایر انواع ماساژ که می‌توانند انرژی روحی شما را صدچندان کند.
				<br>
				این هتل مرتفع‌ترین هتل کشور محسوب می‌شود و می‌توانید با اقامت در آن از تماشای مناظر گسترده‌ای از شهر مشهد لذت ببرید. در ضمن در هتل درویش مشهد چند رستوران وجود دارد که در آن‌ها انواع غذاهای ملل ازجمله غذاهای کشور مراکش و غذاهای برخی از کشورهای آسیایی  سرو می‌شود.
				<br>
				همچنین می‌توانید با حضور در رستوران روف گاردن هتل و لمکده آن که در کنار برکه‌ای مصنوعی در طبقات بالای هتل قرار دارد، نیز لحظاتی به‌یادماندنی در محیط طبیعی با طراوت را سپری کنید. مرکز خرید هتل با معماری تاریخی و خاص که در آن سوغاتی‌های نقاط مختلف کشور عرضه می‌شوند، نیز می‌تواند اکثر مسافران را شیفته خود کند.
			</p>
			<h2 class="seo-content-heading">
				قدیمی ترین هتل های سنتی ایران
			</h2>
			<p>
				<a href="https://radar361.com/isfahan/abbasi/" target="_blank">هتل عباسی اصفهان</a>، هتلی پنج ستاره در قلب اصفهان، که در معماری آن سبک معماری سنتی و معماری مدرن با یکدیگر تلفیق شده‌اند، به‌عنوان زیباترین هتل خاورمیانه معرفی شده است و نام آن همیشه در صدر بهترین هتل های ایران قرار دارد و بدون تردید جزو برترین هتل های لاکچری ایران نیز محسوب می‌شود.
				<br>
				هتل عباسی اصفهان کاروانسرایی بازسازی شده با سبک معماری دوران صفویه است. نقاشی‌ها، نقش و نگارهای جذاب با رنگ‌های سبز، طلایی و حکاکی‌های بخش‌های مختلف ساختمان هتل با طرح‌های متنوع و از همه مهم‌تر آینه‌کاری‌ها و لوسترهای  یکی از رستوران‌های هتل شما را در دنیایی از زیبایی‌های بی‌انتها غرق می کند و بی‌اختیار لب به تحسین می‌گشایید. با اقامت در این هتل می‌توانید اقامت در فضایی شبیه به کاخ‌های دوران صفوی را تجربه کنید.
				<br>
				فضای باز هتل نیز با معماری و بافت کاملاً سنتی خود، فضای سبز با طراوت خود، حوضی بزرگ با فواره‌های جاری و پرنشاط و نورپردازی خیره‌کننده‌اش در شب، هر فردی را محسور کند و هر گوشه از آن زیبایی بی‌بدیلی به چشم شما هدیه می‌کند.
				<br>
				هتل پنج ستاره عامری کاشان یکی از خانه‌های تاریخی مجلل و بزرگ شهر محسوب می‌شود که اکنون به هتلی پنج ستاره تبدیل شده است. معماری کاملاً تاریخی این هتل و عناصر جذاب آن مثل بادگیر بلند هتل، آینه‌کاری‌ها، کاشی‌کاری‌های خوش ‌نقش و نگار، سرداب و قسمت شاه‌نشین هتل علاقه‌مندان به معماری تاریخی و سنتی اصیل و فاخر ایرانی را شیفته خود می‌کند.
				<br>
				هتل پنج ستاره بیستون لاله کرمانشاه یکی دیگر از هتل‌های عجیب ایران محسوب می‌شود که در حقیقت یکی از کاروانسراهای دوران صفوی با قدمتی ۴۰۰ ساله است. بافت قدیمی اتاق‌ها و سایر قسمت‌های کاروانسرا کاملاً حفظ شده است و با اقامت در این هتل که در جنب کوه بیستون قرار دارد، می‌توانید از شاخص‌ترین آثار تاریخی به‌جامانده از دوران ساسانی دیدن کنید.
				<br>
				علاوه بر این هتل‌ها هتل چهار ستاره‌ <a href="https://radar361.com/yazd/antik-malek-al-tojar/" target="_blank">ملک التجار یزد</a> نیز جزو قدیمی‌ترین هتل‌های سنتی ایران هستند. این دو هتل نیز جزو هتل های خوب ایران هستند.
				<br>
				اکنون که با بهترین و عجیب‌ترین هتل‌های ایران آشنا شدید می‌توانید برای سفری هیجان‌انگیز برنامه‌ریزی کنید. برای <nuxt-link to="/" class="seo-content-link">
					رزرو هتل
				</nuxt-link> های ایران کار را به رادار361 بسپارید زیرا این سایت یک موتور جستجو در حوزه گردشگری است و با جستجو در سایت‌های رزرو هتل قیمت‌های مختلف برای هر هتل را به شما نمایش می‌دهد. به این ترتیب می‌توانید رزرو هتل را با بهترنی قیمت انجام دهید.
				<br>
				علاوه‌بر رزرو هتل های ایران، در سایت رادار361 می‌توانید خرید <nuxt-link to="/flights" class="seo-content-link">
					بلیط هواپیما
				</nuxt-link> به سراسر ایران را انجام دهید. برای این منظور سری به بخش هواپیما بزنید و با بهترین قیمت پرواز مورد نظرتان را رزرو کنید.
			</p>
		</div>
	</div>
</template>
<script>
import { faHotel, faPlane } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import HotelSearch from '../components/hotel/HotelSearch.vue';
import Message from '../components/Message.vue';
import SearchSegment from '../components/searchSegment';
import HotelStore from '~/store/Hotel';
library.add(faHotel, faPlane);
export default {
	layout: 'mainPage',
	components: {
		HotelSearch,
		Message,
		SearchSegment
	},
	data: function () {
		return {
			sellersLogoArray: []
		};
	},
	middleware: 'cityRedirect',
	computed: {
		citiesList() {
			const chunks = [];
			const arr = this.$store.state.Hotel && this.$store.state.Hotel.cities && this.$store.state.Hotel.cities[0] && this.$store.state.Hotel.cities[1] ? (this.$store.state.Hotel.cities[0].list).concat(this.$store.state.Hotel.cities[1].list) : [];
			let i = 0;
			const n = arr.length;
			const len = n / 5;
			while (i < n) {
				chunks.push(arr.slice(i, (i += len)));
			}
			return chunks;
		},
		cityHotelList() {
			return this.$store.state.Hotel.cities.concat(this.$store.state.Hotel.hotelNameList);
		}
	},
	beforeMount() {
		try {
			const payload = { ResidenceCity:1 };
			HotelStore.of(this.$store).loadCities(payload);
			HotelStore.of(this.$store).loadHotelNameList();
		} catch (err) {
			this.$nuxt.error(err);
		}
	},
	mounted: function () {
		this.shuffle();
	},
	methods: {
		shuffle: function () {
			const array = [
				'alaeddin',
				'eghamat24',
				'jainjas',
				'jabama',
				'snapptrip',
				'hotelyar',
				'egardesh'
			];
			let currentIndex = array.length;
			let temporaryValue;
			let randomIndex;
			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			this.sellersLogoArray = array;
		},
		searchHotels: function (id, CheckInDate, CheckOutDate, capacity) {
			this.$router.push('/' + id + '/' + CheckInDate + '/' + CheckOutDate + '?capacity=' + capacity);
		}
	},
	head() {
		return {
			htmlAttrs: {
				'iranhotels-page': true
			},
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'رادار۳۶۱، جامع‌ترین موتور جستجوی رزرو هتل در تمامی شهرهای ایران'
				}
			],
			title: 'تمامی هتل‌های ایران'
		};
	}
};
</script>
<style scoped>
@import url('~/assets/css/main-pages.css');
.seo-content a {
	color: #EB384D !important
}
.hotelyar {
	background-image: url("../assets/images/hotel-provider/hotelyar.svg");
	background-size: 90px;
	width: 90px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}

.snapptrip {
	background-image: url("../assets/images/hotel-provider/snapptrip.svg");
	background-size: 90px;
	width: 90px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}

.jainjas {
	background-image: url("../assets/images/hotel-provider/jainjas.svg");
	background-size: 90px;
	width: 90px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}
.eghamat24 {
	background-image: url("../assets/images/hotel-provider/eghamat24.svg");
	background-size: 90px;
	width: 90px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}

.alaeddin {
	background-image: url("../assets/images/hotel-provider/alaeddin.svg");
	background-size: 130px;
	width: 130px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}
.egardesh {
	background-image: url("../assets/images/hotel-provider/egardesh.svg");
	background-size: 90px;
	width: 90px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}
.jabama {
	background-image: url("../assets/images/hotel-provider/jabama.svg");
	background-size: 130px;
	width: 130px;
	height: 70px;
	background-repeat: no-repeat;
	background-position: center;
}
@media (min-width: 767px) and (max-width: 991.98px) {
  .eghamat {
    background-size: 110px
  }
  .iranhotel {
    background-size: 110px
  }
}
@media (max-width: 575.98px) {
	.cities-list__box {
		border: none !important
	}
	.eghamat {
		background-size: 90px
	}
	.iranhotel {
		background-size: 90px
	}
}
.main-page__line {
    height: 3px;
    background: #F0F0F0;
    width: calc(100% - 130px);
    margin-right: 14px;
}
.main-page__title {
    font-size: 19px;
    line-height: 23px;
    text-align: right;
    color: #222222;
    margin: 0px !important;
    font-weight: 600;
}
.cities-list {
    padding: 35px 0px;
}
.cities-list__box {
    border: 1px solid #D1D1D1;
    border-radius: 10px;
    margin-top: 30px;
    background: white;
	padding: 20px;
}
.cities-list__box__row {
	width: 20%;
	text-align: right;
}
.cities-list__box__row:not(:first-child) {
	border-right: 1px solid lightgrey
}
.cities-list__box__row div {
	width: 100%;
	height: 40px;
    line-height: 35px;
	display: block;
	padding: 0 5px;
}
.cities-list__box__row div a {
	display: block;
	width: 100%;
    border-bottom: 1px solid #e6e6e6;
	color: #888888;
	font-size: 13px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cities-list__box__row div a:hover {
	color: #EB384D !important
}
.cities-list__box__row div:last-child div a{
	border-bottom: none !important;
}
.seo-content-link {
	color: #EB384D !important;
}
@media screen and (max-width: 768px) {
	.cities-list__box__row {
		width: 50%;
	}
	.cities-list__box__row div:last-child div a{
		border-bottom: 1px solid #e6e6e6 !important;
	}
	.cities-list__box__row:nth-child(2n+1) {
		border-right: none
	}
	.main-page__title {
		margin-right: 20px !important
	}
	.main-page__line {
		width: calc(100% - 150px) !important;
	}
}
.advertise h2 {
	display: inline;
    font-weight: 600;
    font-size: inherit;
}
::v-deep .advertise {
	color: #424242
}
</style>
