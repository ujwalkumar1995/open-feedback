import React, { useState } from 'react'
import { array, bool, object, string } from 'yup'
import { Field, Form, Formik } from 'formik'
import OFFormControl from '../../../baseComponents/form/formControl/OFFormControl'
import OFAutoComplete from '../../../baseComponents/form/autoComplete/OFAutoComplete'
import { useTranslation } from 'react-i18next'
import TranslatedTypography from '../../../baseComponents/TranslatedTypography'
import LangMap from 'langmap'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core'
import FormikAutoSave from '../../../baseComponents/form/autoSave/FormikAutoSave'
import AutoSaveNotice from '../../../baseComponents/layouts/AutoSaveNotice'
import Box from '@material-ui/core/Box'
import langMapArray from '../../utils/convertLangMapArray'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { OFSwitch } from '../../../baseComponents/form/switch/OFSwitch'
import { DonateToActivateDialog } from '../../../baseComponents/DonateToActivateDialog'

const SettingsForm = ({
    onSave,
    initialLanguages,
    disableSoloTalkRedirect,
    hideVotesUntilUserVote = false,
    displayTitle = true,
    liveUserVotes = false,
    isOrganizationSettings = false,
}) => {
    const { t } = useTranslation()
    const [donationDialogOpen, setDonationDialogOpen] = useState(false)

    return (
        <>
            <Formik
                validationSchema={object().shape({
                    languages: array().of(string()),
                    disableSoloTalkRedirect: bool(),
                    hideVotesUntilUserVote: bool(),
                    liveUserVotes: bool(),
                })}
                initialValues={{
                    languages: initialLanguages.map((tag) => ({
                        ...LangMap[tag],
                        tag,
                    })),
                    disableSoloTalkRedirect: !disableSoloTalkRedirect,
                    hideVotesUntilUserVote: hideVotesUntilUserVote,
                    liveUserVotes: liveUserVotes,
                }}
            >
                {({ values }) => (
                    <Form method="POST">
                        {displayTitle && (
                            <TranslatedTypography
                                i18nKey="settingsSetup.settings"
                                variant="h5"
                            />
                        )}
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <OFFormControl
                                    name={t('settingsSetup.languages')}
                                    fieldName="languages"
                                    type="text"
                                >
                                    <Field
                                        name="languages"
                                        value={values.languages}
                                        dataArray={langMapArray}
                                        keysToDisplay={[
                                            'nativeName',
                                            'englishName',
                                            'tag',
                                        ]}
                                        multiple={true}
                                        component={OFAutoComplete}
                                    />
                                </OFFormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <OFFormControl fieldName="disableSoloTalkRedirect">
                                    <FormControlLabel
                                        label={t(
                                            'settingsSetup.disableSoloTalkRedirect'
                                        )}
                                        labelPlacement="start"
                                        control={
                                            <Field
                                                name="disableSoloTalkRedirect"
                                                component={OFSwitch}
                                            />
                                        }
                                    />
                                </OFFormControl>
                                <OFFormControl fieldName="hideVotesUntilUserVote">
                                    <FormControlLabel
                                        label={t(
                                            'settingsSetup.hideVotesUntilUserVote'
                                        )}
                                        labelPlacement="start"
                                        control={
                                            <Field
                                                name="hideVotesUntilUserVote"
                                                component={OFSwitch}
                                            />
                                        }
                                    />
                                </OFFormControl>
                                {!isOrganizationSettings && (
                                    <OFFormControl fieldName="liveUserVotes">
                                        <FormControlLabel
                                            label={t(
                                                'settingsSetup.liveUserVotes'
                                            )}
                                            labelPlacement="start"
                                            control={
                                                <Field
                                                    name="liveUserVotes"
                                                    component={OFSwitch}
                                                    onClick={() => {
                                                        if (
                                                            !values.liveUserVotes
                                                        ) {
                                                            setDonationDialogOpen(
                                                                true
                                                            )
                                                        }
                                                    }}
                                                />
                                            }
                                        />
                                    </OFFormControl>
                                )}
                            </Grid>
                        </Grid>

                        <FormikAutoSave
                            onSave={(values) => {
                                const languages = values.languages.map(
                                    (value) => value.tag
                                )
                                return onSave({
                                    ...values,
                                    languages,
                                    disableSoloTalkRedirect:
                                        !values.disableSoloTalkRedirect,
                                    hideVotesUntilUserVote:
                                        values.hideVotesUntilUserVote,
                                    liveUserVotes: values.liveUserVotes,
                                })
                            }}
                            render={({
                                isSaving,
                                lastSavedDate,
                                saveError,
                            }) => (
                                <div>
                                    {isSaving ? (
                                        <Box textAlign="right">
                                            {' '}
                                            <CircularProgress />{' '}
                                        </Box>
                                    ) : saveError ? (
                                        `Error: ${saveError}`
                                    ) : lastSavedDate ? (
                                        <AutoSaveNotice
                                            saveDate={lastSavedDate}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            )}
                        />
                    </Form>
                )}
            </Formik>
            {donationDialogOpen && (
                <DonateToActivateDialog
                    isDialogOpen={donationDialogOpen}
                    onClose={() => setDonationDialogOpen(false)}
                />
            )}
        </>
    )
}

export default SettingsForm
