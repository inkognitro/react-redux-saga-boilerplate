import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShowMessage, ToastTypes } from 'packages/common/toaster/domain';
import { ContentPage } from 'web-app/foundation/ui';
import { RootState } from 'web-app/services.factory';
import { FunctionalLink, Link, LinkTargets } from 'packages/common/layout-foundation/general/ui/web';
import { createLeakReduxState } from 'web-app/pages/home/domain';
import { FormElement, FormGroup } from 'packages/common/form-element/general/ui/web';
import { Form } from 'packages/common/form/ui/web';
import { createLogin } from 'packages/common/authentication/domain';
import { DropdownMenu } from 'packages/common/layout-foundation/menu/ui/web';
import { createDropdownOptionsState } from 'packages/common/layout-foundation/menu/domain';

export const HomePage: FC = () => {
    const [optionsState] = useState(
        createDropdownOptionsState<string>([
            {
                data: 'foo',
                children: [
                    {
                        data: 'foo0',
                    },
                    {
                        data: 'foo1',
                        children: [
                            {
                                data: 'foo1.1',
                            },
                            {
                                data: 'foo1.2',
                            },
                            {
                                data: 'foo1.3',
                            },
                        ],
                    },
                    {
                        data: 'foo2',
                        children: [
                            {
                                data: 'foo2.1',
                            },
                            {
                                data: 'foo2.2',
                            },
                            {
                                data: 'foo2.3',
                            },
                        ],
                    },
                ],
            },
            {
                data: 'bar',
            },
            {
                data: 'baz',
            },
        ])
    );
    const dispatch = useDispatch();
    const toastContent = useSelector((state: RootState) => state.pages.homePage.toastContent);
    const toastContentValue = toastContent.value;
    return (
        <ContentPage>
            <h3>Routing</h3>
            <div>
                <Link url="/some-page-which-does-not-exist">go to non existing page</Link>
            </div>

            <br />
            <h3>Toasts</h3>
            <Form
                onSubmit={() =>
                    dispatch(
                        createShowMessage({
                            toastType: ToastTypes.SUCCESS,
                            content: toastContentValue,
                        })
                    )
                }>
                <FormGroup>
                    <FormElement data={toastContent} />
                </FormGroup>
            </Form>
            <div>
                <FunctionalLink
                    onClick={() =>
                        dispatch(
                            createShowMessage({
                                toastType: ToastTypes.SUCCESS,
                                content: toastContentValue,
                            })
                        )
                    }>
                    add a success toast message
                </FunctionalLink>{' '}
                (is being closed after 3 seconds)
            </div>
            <div>
                <FunctionalLink
                    onClick={() =>
                        dispatch(
                            createShowMessage({
                                toastType: ToastTypes.INFO,
                                content: toastContentValue,
                            })
                        )
                    }>
                    add a info toast message
                </FunctionalLink>
            </div>
            <div>
                <FunctionalLink
                    onClick={() =>
                        dispatch(
                            createShowMessage({
                                toastType: ToastTypes.WARNING,
                                content: toastContentValue,
                            })
                        )
                    }>
                    add a warning toast message
                </FunctionalLink>
            </div>
            <div>
                <FunctionalLink
                    onClick={() =>
                        dispatch(
                            createShowMessage({
                                toastType: ToastTypes.ERROR,
                                content: toastContentValue,
                            })
                        )
                    }>
                    add a error toast message
                </FunctionalLink>
            </div>

            <br />
            <h3>Redux</h3>
            <div>
                Download{' '}
                <Link
                    url="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
                    target={LinkTargets.BLANK}>
                    Redux DevTools
                </Link>{' '}
                for a better developer experience or{' '}
                <FunctionalLink onClick={() => dispatch(createLeakReduxState())}>
                    leak redux state in console
                </FunctionalLink>
            </div>

            <br />
            <h3>Login test</h3>
            <div>
                <FunctionalLink
                    onClick={() =>
                        dispatch(
                            createLogin({
                                username: 'nagato',
                                password: '1234',
                                shouldRemember: true,
                            })
                        )
                    }>
                    trigger login programmatically
                </FunctionalLink>
            </div>

            <br />
            <h3>Testing (use arrow keys)</h3>
            <div style={{ width: '200px'}}>
                <DropdownMenu
                    options={optionsState}
                    renderOption={(option) => option.data.data}
                    onChooseOption={(option) => console.log(option)}
                    isFocused={true}
                />
                <br />
            </div>
        </ContentPage>
    );
};
