<template>
	<div>
		<ol itemscope itemtype="http://schema.org/BreadcrumbList">
			<li
				itemprop="itemListElement"
				itemscope

				itemtype="http://schema.org/ListItem"
			>
				<a itemprop="item" href="https://radar361.com">
					<span itemprop="name">صفحه اصلی</span></a>
				<meta itemprop="position" content="1">
			</li>
			<li
				itemprop="itemListElement"
				itemscope
				itemtype="http://schema.org/ListItem"
			>
				<a itemprop="item" :href="'https://radar361.com/' + cityMeta.NameEn">
					<span itemprop="name">رزرو هتل های {{ cityMeta.NameFa }}</span></a>
				<meta itemprop="position" content="2">
			</li>
		</ol>
		<div v-for="(hotel, index) in cityHotelList" :key="index" itemscope itemtype="http://schema.org/Hotel">
			<h2><span itemprop="name">{{ hotel.NameFa }}</span></h2>
			<span itemprop="description">{{ hotel.Description }}</span>
			<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
				<span itemprop="streetAddress">{{ hotel.AddressSummary }}</span>
				<span itemprop="addressRegion">{{ hotel.Regions }}</span>
				<span itemprop="addressCountry"> ایران</span>
			</div>
			Star rating:
			<span itemprop="starRating" itemscope itemtype="http://schema.org/Rating">
				<meta itemprop="ratingValue" :content="hotel.AverageRate"> {{ hotel.AverageRate }}
			</span>
			<div itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
				<meta itemprop="latitude" :content="hotel.Latitude">
				<meta itemprop="longitude" :content="hotel.Longitude">
			</div>
			<ul>
				<li v-for="(amenity, i) in hotel.Amenities" :key="i" itemprop="amenityFeature" itemscope itemtype="http://schema.org/LocationFeatureSpecification">
					<span itemprop="name">{{ amenity.Title }}</span>
					<meta itemprop="value" content="True">
				</li>
			</ul>
			<div
				itemprop="city"
				itemscope
				itemtype="http://schema.org/city"
			>
				Rated <span itemprop="ratingValue">{{ hotel.RateLevel.Level }}</span>/5
				based on <span itemprop="reviewCount"> {{ hotel.CommentsCount }}</span> customer reviews
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		cityDetail: Object,
		cityMeta: Object,
		cityHotelList: Array
	}
};
</script>
