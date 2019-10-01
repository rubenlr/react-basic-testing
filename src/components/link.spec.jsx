import React from 'react';
import { shallow } from 'enzyme';
import Link from './link'

describe('Jest tests', () => {
    it('Just render simple plain component', () => {
        shallow(<Link />)
    })
})