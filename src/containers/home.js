import { connect } from 'react-redux'
import HomeComponent from '../components/home/homeComponent'
import * as actions from '../redux/actions/index'

const mapStateToProps = state => {
    return {
        heading: state.heading,
        categoryList: state.categoryList,
        productListData: state.productListData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCategoryData: () => dispatch(actions.getCategoryData()),
        getProductList: (catId) => dispatch(actions.getProductList(catId))
    };
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent)

export default Home;


