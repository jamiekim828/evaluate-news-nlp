import handleSubmit from '../src/client/js/formHandler';

test('should call handleSuccess', async () => {
  const p = Promise.resolve();
  postData.mockImplementation(user => p.then(user));
  const handleSuccess = jest.fn();
  const handleErrors = jest.fn();

  handleSubmit(handleSuccess, handleErrors);
  await p;
  expect(postData).toHaveBeenCalled();

  expect(updateUI).toHaveBeenCalled();
});
