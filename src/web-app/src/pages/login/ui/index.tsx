import React, { FC } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ContentPage } from "web-app/foundation/ui";
import { Card } from "packages/common/layout-foundation/ui/web";
import { FormGroup, PrimaryButton, SimpleFormElement } from "packages/common/form-element/ui/web";
import { Form } from "packages/common/form/ui/web";
import { TranslatedText } from "packages/common/translator/ui/web";
import { TranslationIds } from "packages/common/types/util/domain";
import { createLogin } from "web-app/pages/login/domain";
import { RootState } from "web-app/services.factory";

export const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const form = useSelector((state: RootState) => state.pages.loginPage.form);
    return (
        <ContentPage>
            <Card title="Login">
                <Form onSubmit={() => dispatch(createLogin())}>
                    <FormGroup>
                        <SimpleFormElement
                            data={form.content.username}
                            label={{
                                translationId: 'non-existing-translation-id-takes-fallback',
                                fallback: 'Username',
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <SimpleFormElement
                            data={form.content.password}
                            label={{
                                translationId: 'non-existing-translation-id-takes-fallback',
                                fallback: 'Password',
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <SimpleFormElement
                            data={form.content.shouldRemember}
                            label={{
                                translationId: 'non-existing-translation-id-takes-fallback',
                                fallback: 'stay logged in',
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <PrimaryButton onClick={() => dispatch(createLogin())}>
                            <TranslatedText translation={{ translationId: TranslationIds.LOGIN }} />
                        </PrimaryButton>
                    </FormGroup>
                </Form>
            </Card>
        </ContentPage>
    );
};
