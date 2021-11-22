import Banner from './Banner';

function Banners({banners}) {

    return (
        banners.map(
            banner => <Banner key={banner.uid} banner={banner} />
        )
    );
}
export default Banners;