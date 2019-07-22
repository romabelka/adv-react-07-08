import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-dnd', () => ({
  useDrag: () => [{}, () => {}, () => {}]
}))

jest.mock('react-dnd-html5-backend', () => ({
  getEmptyImage: () => ({})
}))
