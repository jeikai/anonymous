import './Search.scss'

export default function Search() {
    return (
        <>
            <div className='search-container'>
                <form className='search-bar'>
                    <input type='text' name='search' placeholder='Tìm theo tên...'></input>
                    <button type='submit'><i class="fas fa-search"></i></button>
                </form>
            </div>
        </>
    )
}