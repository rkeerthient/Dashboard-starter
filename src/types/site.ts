export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Tasks {
	name?: string,
	description?: string,
	field?: string,
	question?: string,
	newSectionHeading?: string,
	slider?: boolean,
	sliderLowText?: string,
	sliderHighText?: string,
	readonly?: boolean,
}

export interface C_taskGroups {
	name?: string,
	description?: string,
	tasks?: Tasks[],
	shouldScore?: boolean,
}

export default interface Ce_site {
	primaryPhoto?: ComplexImage,
	logo?: ComplexImage,
	name: string,
	c_brandLogo?: Image,
	c_dashboardCompletionDescription?: string,
	c_dashboardCompletionLabel?: string,
	c_dashboardHeroDescription?: string,
	c_dashboardPagesURLText?: string,
	c_deskFooter?: Image,
	c_deskHeader?: Image,
	c_mobFooter?: Image,
	c_mobHeader?: Image,
	c_taskGroups?: C_taskGroups[],
	c_templateABanner?: Image,
	c_templateBBanner?: Image,
	id: string,
}
