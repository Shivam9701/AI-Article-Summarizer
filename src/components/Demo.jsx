import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary: ''
    })

    const handleSubmit = async () => {
        alert('Please wait while we summarize the article for you.');
        setArticle({ url: '', summary: '' })
    }

    return (
        <section className='mt-16 w-full'>
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}>

                    <img src={linkIcon} alt='link' className='absolute left-0 my-2 ml-3 w-5' />

                    <input type='url' placeholder='Enter URL'
                        value={article.url}
                        onChange={(e) => { setArticle({ ...article, url: e.target.value }) }}
                        className='url_input peer' />

                    <button type='submit' className='submit_btn 
                         peer-focus:border-gray-700 peer-focus:text-orange-300'>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>



                </form>
            </div>
        </section>
    )
}

export default Demo