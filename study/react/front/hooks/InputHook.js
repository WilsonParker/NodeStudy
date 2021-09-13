import {useState, useCallback} from 'react';

export default (defaultValue = null) => {
    const [value, setValue] = useState(defaultValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return [value, handler];
}