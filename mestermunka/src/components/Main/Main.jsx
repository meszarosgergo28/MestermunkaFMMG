import Header from './MainComponents/Header';
import IdopontSection from './MainComponents/IdopontSection';
import CardSlider from './MainComponents/Cards';
import Footer from '../CommonComponents/Footer';
import Menu from '../CommonComponents/Menu';

function Main() {
    return (
        <div>
            <Menu />
            <Header />
            <IdopontSection />
            <CardSlider />
            <Footer />
        </div>
    )
}

export default Main;