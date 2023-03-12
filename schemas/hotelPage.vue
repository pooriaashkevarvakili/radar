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
			<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a itemprop="item" :href="'https://radar361.com/' + city">
					<span v-if="cityNameFa" itemprop="name">رزرو هتل های {{ cityNameFa.label }}</span>
					<meta itemprop="position" content="2">
				</a>
			</li>
			<li
				itemprop="itemListElement"
				itemscope
				itemtype="http://schema.org/ListItem"
			>
				<a itemprop="item" :href="'https://radar361.com/' + city + '/' + hotelMeta.NameEn">
					<span itemprop="name">{{ hotelMeta.NameFa }}</span>
					<meta itemprop="position" content="2">
				</a>
			</li>
		</ol>
		<div itemscope itemtype="http://schema.org/hotelMeta">
			<h1><span itemprop="name">{{ hotelMeta.Type.Name + ' ' + hotelMeta.NameFa }}</span></h1>
			<span itemprop="description">{{ hotelMeta.Description }}</span>
			<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
				<span itemprop="streetAddress">{{ hotelMeta.AddressSummary }}</span>
				<span itemprop="addressRegion">{{ hotelMeta.Regions }}</span>
				<span itemprop="addressCountry"> ایران</span>
			</div>
			Phone: <span itemprop="telephone">{{ hotelMeta.PhoneNumber }}</span>
			<img v-for="(image, i) in hotelMeta.Images.slice(0,3)" :key="i + '/' + image.Caption" itemprop="photo" :src="image.URL" :alt="image.Caption">
			Star rating:
			<span itemprop="starRating" itemscope itemtype="http://schema.org/Rating">
				<meta itemprop="ratingValue" :content="hotelMeta.AverageRate"> {{ hotelMeta.AverageRate }}
			</span>
			<div itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
				<meta itemprop="latitude" :content="hotelMeta.Latitude">
				<meta itemprop="longitude" :content="hotelMeta.Longitude">
			</div>
			<ul>
				<li v-for="(amenity, i) in hotelMeta.Amenities" :key="i" itemprop="amenityFeature" itemscope itemtype="http://schema.org/LocationFeatureSpecification">
					<span itemprop="name">{{ amenity.Title }}</span>
					<meta itemprop="value" content="True">
				</li>
			</ul>
			<div
				itemprop="hotel"
				itemscope
				itemtype="http://schema.org/hotel"
			>
				Rated <span itemprop="ratingValue">{{ hotelMeta.RateLevel.Level }}</span>
				<span itemprop="bestRating">5</span>
				based on <span itemprop="ratingCount"> {{ hotelMeta.CommentDetails.CommentsCount }}</span> customer reviews
			</div>
			<div v-for="(room, index) in roomPrice.RoomTypes" :key="index" itemtype="http://schema.org/HotelRoom http://schema.org/Product">
				<span itemprop="”name”"> {{ room.RoomTypes }}</span>
				<div itemprop="offers" itemscope itemtype="http://schema.org/AggregateOffer">
					<span itemprop="lowPrice">{{ roomPrice.CheaperSeller.TotalPrice }} IRR</span>
					from <span v-if="room.Sellers" itemprop="offerCount"> {{ room.Sellers.length }}</span> sellers
					Sellers:
					<div v-for="(seller, i) in roomPrice.Sellers" :key="i" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
						<a itemprop="url" :href="i.Provider.WebSite">{{ i.Provider.Name }}  - {{ i.TotalPrice }} IRR</a>
					</div>
				</div>
			</div>
			<meta itemprop="openingHours" :content="hotelMeta.CheckInHour"> {{ hotelMeta.CheckInHour }}
			<span v-if="roomPrice.RoomTypes" itemprop="numberOfRooms">{{ roomPrice.RoomTypes.length }}</span> rooms
		</div>
	</div>
</template>

<script>
export default {
	props: {
		hotelMeta: Object,
		city: String,
		cityNameFa: Object,
		roomPrice: Object
	}
};
</script>
