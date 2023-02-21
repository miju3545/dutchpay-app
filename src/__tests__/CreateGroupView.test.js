import { render, screen } from '@testing-library/react';
import CreateGroupView from '../components/group/CreateGroupView';
import userEvent from '@testing-library/user-event';

const renderComponent = () => {
  render(<CreateGroupView />);

  const input = screen.getByPlaceholderText('2023 부산 여행 with 삼총사');
  const saveButton = screen.getByText('저장');
  const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.');

  return { input, saveButton, errorMessage };
};

describe('CreateGroupView(그룹 생성 페이지) 테스트', () => {
  test('그룹 이름 입력 컴포넌트를 렌더링 한다.', () => {
    // render target component;
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();

    expect(saveButton).not.toBeNull();
  });

  test("그룹 이름을 입력하지 않고 저장 버튼을 '클릭'했을 때, 에러 메시지를 노출한다.", async () => {
    const { saveButton, errorMessage } = renderComponent();

    await userEvent.click(saveButton);

    expect(errorMessage).not.toBeNull();
  });

  test("그룹 이름을 정상적으로 입력 후, 저장 버튼을 '클릭'하면, 저장이 성공한다.", async () => {
    const { input, saveButton, errorMessage } = renderComponent();

    await userEvent.type(input, 'testing...');

    await userEvent.click(saveButton);

    expect(errorMessage).toBeNull();
  });
});
