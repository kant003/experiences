
export default function Banner({ banner }) {
    return (
        <div className="box">
            <div>id: {banner && banner.id}</div>
            <div>text: {banner && banner.text}</div>
        </div>

    )
}