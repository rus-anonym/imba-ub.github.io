import {
    Group,
    Placeholder,
    Spinner,
    useAdaptivityWithJSMediaQueries
} from "@vkontakte/vkui";

const LoadingPlaceholder = () => {
    const { isDesktop } = useAdaptivityWithJSMediaQueries();

    if (isDesktop) {
        return (
            <Group>
                <Placeholder>
                    <Spinner size="large" />
                </Placeholder>
            </Group>
        );
    }

    return (
        <Placeholder stretched>
            <Spinner size="large" />
        </Placeholder>
    );
};

export default LoadingPlaceholder;
