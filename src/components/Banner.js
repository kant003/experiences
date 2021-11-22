
export default function Banner({ banner }) {
    return (
        <div class="box">
            <div>uid: {banner && banner.id}</div>
            <div>uid: {banner && banner.text}</div>
         </div>
       
    )
}