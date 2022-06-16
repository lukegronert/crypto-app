import MainNav from '../components/MainNav';

import '../css/about.css'

export default function About() {
    return (
        <section>
            <MainNav />
            <div className="aboutDescription">
                <h1 className="aboutDescriptionTitle">ABOUT</h1>
                <p>
                    CRYPTO is a website for people who want to invest in cryptocurrency without the risk 
                    of using real money. Users can use the platform to buy and sell various coins, 
                    track purchases, and compete to be one of the top most profitable portfolios on 
                    CRYPTO. 
                </p>
                    
                <p>
                    To open your account:
                    <ol className="accountInstructionsList">
                        <li>
                            Click the A in the rop right of the page and select 
                            "Login/Logout"
                        </li>
                        <li>
                            Follow Sign Up instructions (Note that your name will be used as your Display Name on CRYPTO)
                        </li>
                        <li>
                            Make sure to check the verification email that will be sent to you
                        </li>
                        <li>
                            After verifying your email, head over to the Dashboard page
                        </li>
                        <li>
                            Go to the Account tab
                        </li>
                        <li>
                            Click "Fill your bank!"
                        </li>
                    </ol>
                </p>
                <p>
                    All users start with 10,000 "dollars". 
                    Good luck and may the best investor win!
                </p>
            </div>
        </section>
    )
}