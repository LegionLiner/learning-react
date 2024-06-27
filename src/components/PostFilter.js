import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({ filter, setFilter }) => {

    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder="Поиск поста"></MyInput><MySelect
                    value={filter.sort}
                    onChange={sort => setFilter({ ...filter, sort })}
                    defaultValue="Сортировка"
                    options={[
                        { value: 'title', name: 'По названию' },
                        { value: 'body', name: 'По содержанию' }
                    ]}></MySelect>
        </div>
    )
}

export default PostFilter;