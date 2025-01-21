import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {AppForm, CreateEventValue} from 'common/form/app-form';
import {AppInputField} from 'common/form/app-input-field';
import {AppDatePickerField} from 'common/form/app-date-picker-field';
import {AppSubmitButton} from 'common/form/app-submit-button';
import {AppTimePickerField} from 'common/form/app-time-picker-field';
import {createEventSchema, processEventDates} from './utils';
import {PlacesAutoCompleteInputField} from 'common/form/places-input-field';
import useStore from 'store';
import {useNavigation} from '@react-navigation/native';
import {createOrganizedEvent} from 'service/organizedEvents';
import {AppText} from 'common/text';
import {COLORS} from 'styles';

export default function CreateEvents() {
  const {profile} = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const onHandleSubmit = async (values: CreateEventValue) => {
    const event = processEventDates(values);
    setIsLoading(true);
    setIsError(false);
    try {
      const {isError, isSuccess} = await createOrganizedEvent({
        address: event?.location?.address || '',
        startDate: event.startDate,
        endDate: event.endDate,
        endTime: event.endDate,
        startTime: event.startTime,
        eventLocation: {
          lat: event?.location?.lat || 0,
          lng: event?.location?.lng || 0,
        },
        city: event?.location?.city || '',
        country: event?.location?.country || '',
        title: event.title,
        description: event.desc,
        maxNumber: event.maxNumber,
        user: {
          username: profile.username,
          photo: profile.photo,
        },
      });
      setIsError(isError);
      if (isSuccess) {
        navigation.goBack();
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView>
      <AppForm
        validationSchema={createEventSchema}
        initialValues={{
          title: '',
          startDate: undefined,
          endDate: undefined,
          startTime: undefined,
          endTime: undefined,
          desc: '',
          location: undefined,
          maxNumber: 0,
        }}
        onSubmit={onHandleSubmit}>
        <React.Fragment>
          <AppInputField name="title" placeholder="Title" />
          <AppInputField name="desc" placeholder="Description" isMulti />
          <PlacesAutoCompleteInputField
            name="location"
            placeholder="Location"
          />
          <AppInputField name="maxNumber" placeholder="Max number" />

          <AppDatePickerField
            name="startDate"
            placeholder="Select Start Date"
          />
          <AppDatePickerField
            name="endDate"
            placeholder="Select End Date (Optional)"
          />
          <AppTimePickerField />
          {isError && (
            <AppText style={{color: COLORS.danger, margin: 12}}>
              Error creating event, please try again later
            </AppText>
          )}
          <AppSubmitButton title="Submit" loading={isLoading} />
        </React.Fragment>
      </AppForm>
    </ScrollView>
  );
}
