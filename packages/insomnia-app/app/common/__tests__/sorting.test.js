import { globalBeforeEach } from '../../__jest__/before-each';
import {
  ascendingNameSort,
  ascendingTypeSort,
  createdFirstSort,
  createdLastSort,
  descendingNameSort,
  descendingTypeSort,
  httpMethodSort,
  metaSortKeySort,
} from '../sorting';
import { request, requestGroup } from '../../models';
import {
  METHOD_DELETE,
  METHOD_GET,
  METHOD_HEAD,
  METHOD_OPTIONS,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_PUT,
} from '../constants';

describe('Sorting methods', () => {
  beforeEach(globalBeforeEach);

  it('sorts by name', () => {
    expect(ascendingNameSort({ name: 'a' }, { name: 'b' })).toBe(-1);
    expect(ascendingNameSort({ name: 'b' }, { name: 'a' })).toBe(1);
    expect(ascendingNameSort({ name: 'ab' }, { name: 'abb' })).toBe(-1);
    expect(ascendingNameSort({ name: 'abb' }, { name: 'ab' })).toBe(1);
    expect(ascendingNameSort({ name: 'Abb' }, { name: 'bbb' })).toBe(-1);
    expect(ascendingNameSort({ name: 'bbb' }, { name: 'Abb' })).toBe(1);
    expect(ascendingNameSort({ name: 'abb' }, { name: 'Bbb' })).toBe(-1);
    expect(ascendingNameSort({ name: 'Bbb' }, { name: 'abb' })).toBe(1);
    expect(ascendingNameSort({ name: 'åbb' }, { name: 'bbb' })).toBe(-1);
    expect(ascendingNameSort({ name: 'bbb' }, { name: 'åbb' })).toBe(1);
    expect(ascendingNameSort({ name: 'abcdef' }, { name: 'abcdef' })).toBe(0);

    expect(descendingNameSort({ name: 'a' }, { name: 'b' })).toBe(1);
    expect(descendingNameSort({ name: 'b' }, { name: 'a' })).toBe(-1);
    expect(descendingNameSort({ name: 'ab' }, { name: 'abb' })).toBe(1);
    expect(descendingNameSort({ name: 'abb' }, { name: 'ab' })).toBe(-1);
    expect(descendingNameSort({ name: 'Abb' }, { name: 'bbb' })).toBe(1);
    expect(descendingNameSort({ name: 'bbb' }, { name: 'Abb' })).toBe(-1);
    expect(descendingNameSort({ name: 'abb' }, { name: 'Bbb' })).toBe(1);
    expect(descendingNameSort({ name: 'Bbb' }, { name: 'abb' })).toBe(-1);
    expect(descendingNameSort({ name: 'åbb' }, { name: 'bbb' })).toBe(1);
    expect(descendingNameSort({ name: 'bbb' }, { name: 'åbb' })).toBe(-1);
    expect(descendingNameSort({ name: 'abcdef' }, { name: 'abcdef' })).toBe(0);
  });

  it('sorts by timestamp', () => {
    expect(createdFirstSort({ created: 1000 }, { created: 1100 })).toBe(-1);
    expect(createdFirstSort({ created: 1100 }, { created: 1000 })).toBe(1);
    expect(createdFirstSort({ created: 0 }, { created: 1 })).toBe(-1);
    expect(createdFirstSort({ created: 1 }, { created: 0 })).toBe(1);
    expect(createdFirstSort({ created: 123456789 }, { created: 123456789 })).toBe(0);

    expect(createdLastSort({ created: 1000 }, { created: 1100 })).toBe(1);
    expect(createdLastSort({ created: 1100 }, { created: 1000 })).toBe(-1);
    expect(createdLastSort({ created: 0 }, { created: 1 })).toBe(1);
    expect(createdLastSort({ created: 1 }, { created: 0 })).toBe(-1);
    expect(createdLastSort({ created: 123456789 }, { created: 123456789 })).toBe(0);
  });

  it('sorts by type', () => {
    expect(
      ascendingTypeSort(
        { type: request.type, metaSortKey: 2 },
        { type: requestGroup.type, metaSortKey: 1 },
      ),
    ).toBe(-1);
    expect(
      ascendingTypeSort(
        { type: requestGroup.type, metaSortKey: 1 },
        { type: request.type, metaSortKey: 2 },
      ),
    ).toBe(1);
    expect(
      ascendingTypeSort(
        { type: request.type, metaSortKey: 1 },
        { type: request.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      ascendingTypeSort(
        { type: request.type, metaSortKey: 2 },
        { type: request.type, metaSortKey: 1 },
      ),
    ).toBe(1);
    expect(
      ascendingTypeSort(
        { type: requestGroup.type, metaSortKey: 1 },
        { type: requestGroup.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      ascendingTypeSort(
        { type: requestGroup.type, metaSortKey: 2 },
        { type: requestGroup.type, metaSortKey: 1 },
      ),
    ).toBe(1);

    expect(
      descendingTypeSort(
        { type: request.type, metaSortKey: 2 },
        { type: requestGroup.type, metaSortKey: 1 },
      ),
    ).toBe(1);
    expect(
      descendingTypeSort(
        { type: requestGroup.type, metaSortKey: 1 },
        { type: request.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      descendingTypeSort(
        { type: request.type, metaSortKey: 1 },
        { type: request.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      descendingTypeSort(
        { type: request.type, metaSortKey: 2 },
        { type: request.type, metaSortKey: 1 },
      ),
    ).toBe(1);
    expect(
      descendingTypeSort(
        { type: requestGroup.type, metaSortKey: 1 },
        { type: requestGroup.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      descendingTypeSort(
        { type: requestGroup.type, metaSortKey: 2 },
        { type: requestGroup.type, metaSortKey: 1 },
      ),
    ).toBe(1);
  });

  it('sorts by HTTP method', () => {
    expect(httpMethodSort({ type: request.type }, { type: requestGroup.type })).toBe(-1);
    expect(httpMethodSort({ type: requestGroup.type }, { type: request.type })).toBe(1);
    expect(
      httpMethodSort(
        { type: requestGroup.type, metaSortKey: 1 },
        { type: requestGroup.type, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: requestGroup.type, metaSortKey: 2 },
        { type: requestGroup.type, metaSortKey: 1 },
      ),
    ).toBe(1);

    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_GET },
        { type: request.type, method: METHOD_POST },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_POST },
        { type: request.type, method: METHOD_PUT },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_PUT },
        { type: request.type, method: METHOD_PATCH },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_PATCH },
        { type: request.type, method: METHOD_DELETE },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_DELETE },
        { type: request.type, method: METHOD_OPTIONS },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_OPTIONS },
        { type: request.type, method: METHOD_HEAD },
      ),
    ).toBe(-1);

    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_GET, metaSortKey: 1 },
        { type: request.type, method: METHOD_GET, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_GET, metaSortKey: 2 },
        { type: request.type, method: METHOD_GET, metaSortKey: 1 },
      ),
    ).toBe(1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_DELETE, metaSortKey: 1 },
        { type: request.type, method: METHOD_DELETE, metaSortKey: 2 },
      ),
    ).toBe(-1);
    expect(
      httpMethodSort(
        { type: request.type, method: METHOD_DELETE, metaSortKey: 2 },
        { type: request.type, method: METHOD_DELETE, metaSortKey: 1 },
      ),
    ).toBe(1);
  });

  it('sorts by metaSortKey', () => {
    expect(metaSortKeySort({ metaSortKey: 1 }, { metaSortKey: 2 })).toBe(-1);
    expect(metaSortKeySort({ metaSortKey: 2 }, { metaSortKey: 1 })).toBe(1);
    expect(metaSortKeySort({ metaSortKey: -2 }, { metaSortKey: 1 })).toBe(-1);
    expect(metaSortKeySort({ metaSortKey: 1 }, { metaSortKey: -2 })).toBe(1);
    expect(metaSortKeySort({ metaSortKey: 1, _id: 2 }, { metaSortKey: 1, _id: 1 })).toBe(-1);
    expect(metaSortKeySort({ metaSortKey: 1, _id: 1 }, { metaSortKey: 1, _id: 2 })).toBe(1);
  });
});
