import { useState, useEffect } from 'react';
import styles from '@styles/SearchBox.module.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import { SearchJoke } from '@models/joke.model';
import { jokeSchema } from '@utils/form.schema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { ADD_JOKE } from '@redux/actions/jokes';
import { SET_LOADING } from '@redux/actions/loading';
import { Formik } from 'formik';
import axios from 'axios';

const SearchBox = () => {

    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    const handleSearch = async (value, action) => {
        try {
            dispatch(SET_LOADING(true));
            let cloneFilter: Object = {};
            cloneFilter = value;
            let filterUrl: string = '';

            Object.keys(cloneFilter).map((key) => {
                if (key === "firstName" || key === "lastName" || key === 'limit') {
                    if (cloneFilter[key]) {
                        if (key === 'limit') { cloneFilter[key] = parseInt(cloneFilter[key]); }
                        filterUrl += !filterUrl ? `?${key}=${cloneFilter[key]}` : `&${key}=${cloneFilter[key]}`;
                    }
                }

                if (key === 'category') {
                    if (cloneFilter[key] && cloneFilter[key].length > 0) {
                        filterUrl += !filterUrl ? `?${key}=[${cloneFilter[key].join(',')}]` : `&${key}=[${cloneFilter[key].join(',')}]`;
                    }
                }
            })

            const { data: { resultData } } = await axios.get(`/api/jokes${filterUrl}`);
            dispatch(ADD_JOKE(resultData));
            dispatch(SET_LOADING(false));
        } catch (error) {
            dispatch(ADD_JOKE([]));
            dispatch(SET_LOADING(false));
        }

    }

    const resetForm = (handleReset) => {
        dispatch(SET_LOADING(true));
        handleReset();
        dispatch(ADD_JOKE([]));
    }

    const useCategoryList = () => {
        const [categoryList, setCategoryList] = useState<Array<string>>([]);
        const getCategoryList = async () => {
            try {
                const url: string = "/api/categories";
                const { data: { resultData } } = await axios.get(url);
                // console.log('Data : ',resultData);
                setCategoryList(resultData);
            } catch (error) {
                setCategoryList([]);
            }

            setLoading(prevValue => prevValue = false);

        }
        useEffect(() => {
            getCategoryList();
        }, [])
        return { categoryList };
    }

    const { categoryList } = useCategoryList();

    const selectCategory = (value, previousValue, setFieldValue) => {
        let arr: Array<string> = [];
        const isExist = previousValue.filter(oldValue => oldValue === value).length > 0;
        if (isExist) {
            previousValue.splice(previousValue.indexOf(value), 1);
            arr = [...previousValue];
        } else {
            arr = [...previousValue, value];
        }

        setFieldValue('category', arr);
    }

    return (
        <div className={styles.search_box_container}>
            <div className={styles.search_box_content}>
                <Formik
                    initialValues={{ ...new SearchJoke() }}
                    validationSchema={jokeSchema}
                    onSubmit={(value, action) => handleSearch(value, action)}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            handleReset,
                        } = props;

                        return (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.category_container}>
                                    <div className={styles.topic_name}>Category</div>
                                    {
                                        loading ? <Skeleton className={styles.category_skeleton} animation="pulse" /> : (
                                            <div className={styles.category_card_group}>
                                                {
                                                    categoryList && categoryList.length > 0 && categoryList.map((list, index) => (
                                                        <span className={`${styles.category_card} ${values?.category.indexOf(list) !== -1 && styles.selected_category_card} `} key={`category-${index + 1}`} onClick={() => selectCategory(list, values?.category, setFieldValue)}>{list}</span>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                                <div className={styles.separate_line}></div>
                                <div className={styles.name_container}>
                                    <div className={styles.name_group}>
                                        <div className={styles.topic_name}>Firstname</div>
                                        <input type="text" name="firstName" id="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} className={`${styles.name_input_field} ${errors?.firstName && styles.error_field}`} placeholder="Firstname" />
                                        {errors?.firstName && <div className={styles.error_word}>{errors?.firstName}</div>}
                                    </div>
                                    <div className={styles.name_group}>
                                        <div className={styles.topic_name}>Lastname</div>
                                        <input type="text" name="lastName" id="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className={`${styles.name_input_field} ${errors?.lastName && styles.error_field}`} placeholder="Lastname" />
                                        {errors?.lastName && <div className={styles.error_word}>{errors?.lastName}</div>}
                                    </div>
                                </div>
                                <div className={styles.separate_line}></div>
                                <div className={styles.number_jokes_container}>
                                    <div className={styles.topic_name}>Number of jokes</div>
                                    <div className={styles.number_jokes_content}>
                                        <input type="text" name="limit" id="limit" value={values?.limit} className={`${styles.name_input_field} ${errors?.limit && styles.error_field}`} onChange={handleChange} onBlur={handleBlur} />
                                        {errors?.limit && <div className={styles.error_word}>{errors?.limit}</div>}
                                    </div>
                                </div>
                                <div className={styles.search_btn_group}>
                                    <button type="submit" className={styles.btn_search}>SEARCH</button>
                                    <button type="reset" className={styles.btn_clear} onClick={() => { resetForm(handleReset) }}>CLEAR</button>
                                </div>
                            </form>
                        )
                    }}
                </Formik>

            </div>
        </div>
    );
}

export default SearchBox;
