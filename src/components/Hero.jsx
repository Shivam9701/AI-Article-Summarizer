import { logo } from '../assets'

const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>

            <nav className='w-full flex justify-between items-center mb-10 pt-3'>

                <img src={logo} alt='logo' className='w-28 object-contain' />
                <button type='button' className='black_btn'
                    onClick={() => { window.open('https://github.com/Shivam9701/AI-Article-Summarizer') }}
                >GitHub Repo</button>
            </nav>
            <h1 className='head_text'>
                Summarize articles with <br className='max-md:hidden' />
                <span className='orange_gradient'> 
                OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
                Summarize any article with the power of OpenAI GPT-4. 
                <br className='max-md:hidden' />
            </h2>
        </header>
    )
}

export default Hero